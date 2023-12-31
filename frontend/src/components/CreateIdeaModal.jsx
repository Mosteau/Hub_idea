import PropTypes from "prop-types";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function CreateIdeaModal({
  handleOpenModalIdea,
  handleClickDraft,
  handleSubmitIdea,
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="modal-idea-container">
      <div
        className={`create-idea-container ${
          theme === "dark" ? "dark" : "light"
        }`}
      >
        <div
          className="icon-close-container"
          onClick={handleOpenModalIdea}
          role="presentation"
        >
          <img src="images/icon_cross.png" alt="cross" />
        </div>
        <h1>Votre idée</h1>
        <div className="form-entire-container">
          <div className="form-container">
            <form onSubmit={handleSubmitIdea}>
              <div className="form-title-container">
                {/* titre */}
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className={`input-border ${theme === "dark" && "dark"}`}
                />
              </div>
              <div className="form-date-container">
                {/* Date de fin */}
                <label htmlFor="date">Date de fin</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className={`input-border ${theme === "dark" && "dark"}`}
                />
              </div>

              <div className="form-image-container">
                {/* Image */}

                <label htmlFor="idea-image">
                  Télécharger une image de couverture
                </label>

                <div className="image-input-container">
                  <img src="/images/default-image.png" alt="default" />
                  <input
                    className={`button-picture ${theme === "dark" && "dark"}`}
                    type="file"
                    id="ideaimage"
                    name="ideaimage"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
              <label htmlFor="user">Personne impactées</label>
              <div className="form-impacted-person-container">
                {/* Personne impactées */}
                <table className={`table ${theme === "dark" && "dark"}`}>
                  <thead>
                    <tr>
                      <th aria-label="image-checkbox">&nbsp;</th>
                      <th>Prénom</th>
                      <th>Nom</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        aria-label="image-checkbox"
                        className="checkbox-avatar"
                      >
                        <input type="checkbox" id="user" name="user" />
                        <img src="images/hugo.png" alt="" />
                      </td>
                      <td>Hugo</td>
                      <td>lastname</td>
                      <td>hugo@gmail.com</td>
                    </tr>
                    <tr>
                      <td
                        aria-label="image-checkbox"
                        className="checkbox-avatar"
                      >
                        <input type="checkbox" id="user" name="user" />
                        <img src="images/hugo.png" alt="" />
                      </td>
                      <td>Hugo</td>
                      <td>lastname</td>
                      <td>hugo@gmail.com</td>
                    </tr>
                    <tr>
                      <td
                        aria-label="image-checkbox"
                        className="checkbox-avatar"
                      >
                        <input type="checkbox" id="user" name="user" />
                        <img src="images/hugo.png" alt="" />
                      </td>
                      <td>Hugo</td>
                      <td>lastname</td>
                      <td>hugo@gmail.com</td>
                    </tr>
                    <tr>
                      <td
                        aria-label="image-checkbox"
                        className="checkbox-avatar"
                      >
                        <input type="checkbox" id="user" name="user" />
                        <img src="images/hugo.png" alt="" />
                      </td>
                      <td>Hugo</td>
                      <td>lastname</td>
                      <td>hugo@gmail.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="form-description-container">
                {/* personne Déscription */}
                <label htmlFor="description">Déscription</label>
                <textarea
                  id="description"
                  name="description"
                  className={`input-border ${theme === "dark" && "dark"}`}
                />
              </div>
              <div className="buttons-container">
                {/* submit buttons */}
                <input
                  className="button-blue"
                  type="submit"
                  value="Brouillon"
                  onClick={handleClickDraft}
                />
                <input
                  className="button-green"
                  type="submit"
                  value="Publier"
                  // onClick={handleClickPublish}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateIdeaModal.propTypes = {
  handleOpenModalIdea: PropTypes.func.isRequired,
  handleClickDraft: PropTypes.func.isRequired,
  handleSubmitIdea: PropTypes.func.isRequired,
};

export default CreateIdeaModal;
