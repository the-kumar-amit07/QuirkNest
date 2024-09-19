/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { Input, Button, RTEnviroment, Select } from "../components/index";

function PostCardFrom({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, control, setValue, getValues, watch } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.$id || "",
        status: post?.status || "active",
      },
    });
  const onSubmit = async (data) => {
    console.log("submit data of postCard form :", data);
    try {
      const imgFile = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (post) {
        //updating a existing post
        if (imgFile) {
          service.deleteFile(post.featuredImage);
        }
        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: imgFile ? imgFile.$id : post.featuredImage,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        //creating a post

        // normal approach
        // const imgFile = data.image[0] ? await service.uploadFile(data.image[0]) : null
        const dbPost = await service.createPost({
            ...data,
            userId : userData.$id,
            featuredImage : imgFile ? imgFile.$id: undefined
        })
        if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
        }

        //my approach
        // const newPost = {
        //   ...data,
        //   userId: userData.$id,
        //   featuredImage: imgFile ? imgFile.$id : undefined,
        // };
        // const dbPost = await service.createPost(newPost);
        // if (dbPost) {
        //   navigate(`/post/${dbPost.$id}`);
        // }
      }
    } catch (error) {
      console.log("error submitting post", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
        if (name === "title") {
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
    });

    return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap bg-white shadow-lg rounded-lg p-6"
    >
      <div className="w-full md:w-2/3 px-4">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTEnviroment
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full md:w-1/3 px-4">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg shadow-md"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-500"}
          className="w-full text-white py-2 rounded-lg"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostCardFrom;
