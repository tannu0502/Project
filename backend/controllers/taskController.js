const prisma = require("../prismaClient");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      projectId,
      assignedToId,
    } = req.body;

    if (!title || !dueDate || !projectId || !assignedToId) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        projectId,
        assignedToId,
        createdById: req.user.id,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create task error",
      error: error.message,
    });
  }
};
const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Get tasks error",
      error: error.message,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await prisma.task.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        status,
      },
    });

    res.json({
      message: "Task status updated",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update task error",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
};