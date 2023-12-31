import initDB from "@/helper/initDB";
import RootAuth from "@/Middleware/RootAuth";
import Blogs from "@/Modal/Blogs";
initDB();

import { NextResponse } from "next/server";

// --------------To Add Blog--------------
export const POST = RootAuth(async (request) => {
  try {
    const Data = await request.json();
    const { title, category, author, image, description, keywords, artical } =
      Data;

    if (
      !title ||
      !category ||
      !author ||
      !image ||
      !description ||
      !keywords ||
      !artical
    ) {
      throw new Error("Fill all the Fields!");
    }

    const titleExist = await Blogs.findOne({ title });
    if (titleExist) {
      const updateBlog = await Blogs.findOneAndUpdate({ title }, Data);

      return NextResponse.json(
        {
          data: updateBlog,
          message: "Already Exits, Then Updated",
          isSuccess: true,
        },
        {
          status: 200,
        }
      );
    }
    const addBlog = await Blogs.create(Data);
    return NextResponse.json(
      {
        data: addBlog,
        message: "Blog Added Successfully",
        isSuccess: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error?.message,
        isSuccess: false,
      }
    );
  }
});
// --------------To Fetch All Blogs--------------
export const GET = async (request) => {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const page = searchParams.get("page"); // Retrieves the value of the 'page' parameter
    const limit = searchParams.get("limit"); // Retrieves the value of the 'limit' parameter
    const query = searchParams.get("query"); // Retrieves the value of the 'query' parameter  Ex : ?query={"_id":"649ec1dc0227a5b8da286425"}

    const skipCount = (page - 1) * limit;
    const blogCount = await Blogs.countDocuments(); // Get the total count of blogs
    const totalPages = Math.ceil(blogCount / limit); // Calculate the total number of pages
    const blogs = await Blogs.find(JSON.parse(query))
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(limit);

    return NextResponse.json({
      isSuccess: true,
      blogs,
      totalPages,
      blogCount,
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        errorMsg: "Internal Server Error",
        isSuccess: false,
      },
      {
        status: 500,
      }
    );
  }
};
