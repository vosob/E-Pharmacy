import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        description,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

export default { createPost, getPosts, getPostById };
