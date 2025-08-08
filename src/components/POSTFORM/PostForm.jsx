import React, { useCallback } from 'react'
import dbService from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {Button,Input , Select , RTE} from '../index'

function PostForm({post}) {
        const {register , handleSubmit , watch , setValue, control , getValues } = useForm({
            defaultValues: {
                title: post?.title ||' ' ,
                slug: post?.slug || ' ',
                content: post?.content || ' ',
                status: post?.status || 'active',
            }
        })
        const navigate = useNavigate()
        const userData = useSelector(state => state.auth.userData)

        const submit = async(data) => {
            try{
            if (post) {
                const file =  data.image[0] ? await dbService.uploadFile(data.image[0]) : null ;
                
                if (file) {
                    dbService.deleteFile(post.featuredImage)
                }
                const dbpost = await dbService.updatePost( post.$id , {
                    ...data,
                    featuredImage: file ? file.$id :  post.featuredImage,
                })
                if (dbpost) {
                    navigate(`/post/${dbpost.$id}`)
                }

            } else {
                const file = await dbService.uploadFile(data.image[0])
                if(file){
                    const fileId = file.$id
                    data.featuredImage = fileId
                    const dbpost = await dbService.createPost({...data,userId: userData.$id})
                    if(dbpost) navigate(`/post/${dbpost.$id}`);
                        else alert('Post not created')
                }
            }
            }catch (error) {
                console.error('Error submitting post:', error)
                alert('An error occurred while submitting the post.')
            }
        }
        
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

        React.useEffect (()=>{
                const subscription = watch((value ,{name}) => {
                    if (name ==='title') {
                        setValue('slug',slugTransform(value.title), { shouldValidate: true } )
                    }
                })
                return () => {
                    subscription.unsubscribe()
                }
        },[watch,slugTransform,setValue])

    return (
         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap text-white">
            <div className="w-2/3 px-2">
                <Input
                    label="TITLE :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="SLUG :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE  label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required:  !post && !getValues("featuredImage") })}
                />
                {post && post.featuredImage &&(
                    <div className="w-full mb-4">
                        <img
                            src={dbService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full hover:bg-green-600">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm