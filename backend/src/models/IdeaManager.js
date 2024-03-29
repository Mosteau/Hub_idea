const AbstractManager = require("./AbstractManager");

class IdeaManager extends AbstractManager {
  constructor() {
    super({ table: "idea" });
  }

  async create({
    title,
    idea_description: ideaDescription,
    ideaImg,
    date_limit: dateLimit,
    is_validation_administrator: isValidationAdministrator,
    status_id: statusId,
    idea_final_comment: ideaFinalComment,
    user_id: userId,
  }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} ( 
        title,
        idea_description,
        idea_image,
        date_limit,
        is_validation_administrator,
        status_id,
        idea_final_comment,
        user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        ideaDescription,
        ideaImg,
        dateLimit,
        isValidationAdministrator,
        statusId,
        ideaFinalComment,
        userId,
      ]
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT idea.id, idea.title, idea.idea_image, idea.status_id, user.firstname, idea.idea_description, idea.date_limit, idea.idea_final_comment FROM ${this.table}
       JOIN user ON idea.user_id = user.id
      WHERE idea.id = ?`,
      [id]
    );
    return result;
  }

  async readAllIdea() {
    const [result] = await this.database.query(
      `SELECT i.id, i.title, i.idea_image, i.date_limit, i.idea_description, i.status_id, i.user_id, u.firstname FROM ${this.table} AS i JOIN user AS u ON i.user_id = u.id`
    );
    return result;
  }

  async update({
    title,
    idea_description: ideaDescription,
    date_limit: dateLimit,
    status_id: statusId,
    id,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title=?, idea_description=?, date_limit=?, status_id=? WHERE id=?`,
      [title, ideaDescription, dateLimit, statusId, id]
    );
    return result;
  }

  async updateStatusId({ status_id: statusId, id }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET status_id=? WHERE id=?`,
      [statusId, id]
    );

    return result;
  }

  async updateMulter({
    title,
    idea_description: ideaDescription,
    ideaImg,
    date_limit: dateLimit,
    status_id: statusId,
    id,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title=?, idea_description=?, idea_image=?, date_limit=?, status_id=? WHERE id=?`,
      [title, ideaDescription, ideaImg, dateLimit, statusId, id]
    );
    return result;
  }

  async updateByModerator({
    status_id: statusId,
    idea_final_comment: ideaFinalComment,
    id,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET status_id=?, idea_final_comment=? WHERE id=?`,
      [statusId, ideaFinalComment, id]
    );

    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }

  async updateStatusIdByAdmin({
    status_id: statusId,
    date_limit: dateLimit,
    id,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET status_id=?, date_limit=? WHERE id=?`,
      [statusId, dateLimit, id]
    );
    return result;
  }

  async upload(id, ideaImage) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET idea_image=? WHERE id=?`,
      [ideaImage, id]
    );
    return result;
  }
}

module.exports = IdeaManager;
