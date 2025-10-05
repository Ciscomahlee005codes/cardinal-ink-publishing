const categories = require("../../models/categories");

exports.createCategory = async (req: any, res: any) => {
  try {
    const { category } = req.body;
    console.log(category);

    if (!category) {
      return res?.json({
        status: false,
        message: "ensure all fields are not empty",
      });
    }

    const createCategory = await categories.create({
      category,
    });

    if (!createCategory) {
      return res?.json({
        status: false,
        message: "unable to complete request. try again",
      });
    }

    return res?.json({
      status: true,
      message: `${category} category has been created`,
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

exports.getAllCategories = async (req: any, res: any) => {
  try {
    const Categories = await categories.findAll();

    return res?.json({
      status: true,
      data: Categories,
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

exports.getCategoriesById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res?.json({
        status: false,
        message: "requested can't be proccessed. missing arguments",
      });
    }
    const Category = await categories.findOne({ where: { id: id } });

    if (!categories) {
      return res?.json({
        status: false,
        message: "could not complete request",
      });
    }

    return res?.json({
      status: true,
      data: Category,
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

exports.editCategory = async (req: any, res: any) => {
  try {
    const { category, id } = req.body;

    if (!category || !id) {
      console.log(category, id);

      return res?.json({
        status: false,
        message: "missing arguments",
      });
    }

    const createCategory = await categories.update(
      {
        category,
      },
      { where: { id: id } }
    );

    if (!createCategory) {
      return res?.json({
        status: false,
        message: "unable to complete request. try again",
      });
    }

    return res?.json({
      status: true,
      message: ` category has been editted`,
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

exports.deleteCategory = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res?.json({
        status: false,
        message: "missing arguments",
      });
    }

    const createCategory = await categories.destory({ where: { id: id } });

    if (!createCategory) {
      return res?.json({
        status: false,
        message: "unable to complete request. try again",
      });
    }

    return res?.json({
      status: true,
      message: ` category has been deleted`,
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};
