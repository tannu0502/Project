const prisma = require("../prismaClient");

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Project title is required",
      });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        adminId: req.user.id,
        members: {
          create: {
            userId: req.user.id,
          },
        },
      },
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create project error",
      error: error.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Get projects error",
      error: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};