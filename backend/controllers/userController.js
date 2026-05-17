const prisma = require("../prismaClient");

const getMembers = async (req, res) => {
  try {
    const members = await prisma.user.findMany({
      where: {
        role: "MEMBER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    res.json(members);
  } catch (error) {
    res.status(500).json({
      message: "Get members error",
      error: error.message,
    });
  }
};

module.exports = { getMembers };