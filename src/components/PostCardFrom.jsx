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
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: imgFile ? imgFile.$id : undefined,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
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
      className="flex flex-wrap bg-white rounded-xl shadow-lg p-6 md:p-10 transition-all duration-300 ease-in-out max-w-screen-lg mx-auto my-8"
    >
      {/* Title and Content Section */}
      <div className="w-full md:w-2/3 px-4">
        <div className="mb-6">
          <Input
            label="Title"
            placeholder="Enter your post title"
            className="w-full border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-shadow"
            {...register("title", { required: true })}
          />
        </div>

        <div className="mb-6">
          <Input
            label="Slug"
            placeholder="Post Slug"
            className="w-full border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-shadow"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
        </div>

        <div className="mb-6">
          <RTEnviroment
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      {/* Sidebar Section (Image and Status) */}
      <div className="w-full md:w-1/3 px-4">
        <div className="mb-6">
          <Input
            label="Upload Image"
            type="file"
            className="w-full border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-shadow"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
        </div>

        {post && post.featuredImage && (
          <div className="w-full mb-6">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-md shadow-lg w-full h-auto"
            />
          </div>
        )}

        <div className="mb-6">
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="w-full border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-shadow"
            {...register("status", { required: true })}
          />
        </div>

        <div className="mb-6">
          <Button
            type="submit"
            className={`w-full py-3 rounded-md text-white transition-all ${
              post ? "bg-green-500 hover:bg-green-600" : "bg-purple-500 hover:bg-purple-600"
            }`}
          >
            {post ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostCardFrom;