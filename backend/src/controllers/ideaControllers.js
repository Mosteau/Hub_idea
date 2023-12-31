const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const ideas = await tables.Idea.readAll();
    res.json(ideas);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const idea = await tables.Idea.read(req.params.id);
    if (idea == null) {
      res.sendStatus(404);
    } else {
      res.json(idea);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const idea = req.body;
  try {
    const insertId = await tables.Idea.create(idea);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const {
    title,
    idea_description: ideaDescription,
    idea_image: ideaImage,
    date_limit: dateLimit,
    is_validation_administrator: isValidationAdministrator,
    status_id: statusId,
    idea_final_comment: ideaFinalComment,
    user_id: userId,
  } = req.body;

  const updatedIdea = {
    id: req.params.id,
    title,
    idea_description: ideaDescription,
    idea_image: ideaImage,
    date_limit: dateLimit,
    is_validation_administrator: isValidationAdministrator,
    status_id: statusId,
    idea_final_comment: ideaFinalComment,
    user_id: userId,
  };

  try {
    await tables.Idea.update(updatedIdea);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.Idea.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
