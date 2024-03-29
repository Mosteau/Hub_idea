/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

function CreateIdeaModal({
  handleOpenModalIdea,
  handleSubmitIdea,
  usersAssociated,
  setUsersAssociated,
  image,
  setImage,
  inputIdea,
  setInputIdea,
}) {
  const { theme } = useContext(ThemeContext);
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState("default");
  const [titleLength, setTitleLength] = useState(0);

  const handleUploadImage = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleTitleChange = (e) => {
    setInputIdea({ ...inputIdea, ideaTitle: e.target.value });
    setTitleLength(e.target.value.length);
  };
  // const [fileName, setFileName] = useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setInputIdea({ ...inputIdea, ideaDescription: e.target.value });
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAllUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChoseUser = async (e) => {
    const array = [...usersAssociated];
    const index = array.indexOf(e.target.value);
    if (index >= 0) {
      array.splice(index, 1);
    } else {
      array.push(String(e.target.value));
    }
    setUsersAssociated(array);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="create-modal-idea-container">
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
        <div
          className={`form-entire-container ${
            theme === "dark" ? "dark" : "light"
          }`}
        >
          {" "}
          <div className="form-container">
            <form onSubmit={handleSubmitIdea}>
              <div className="form-title-container">
                {/* titre */}
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  maxLength="50"
                  className={`input-border ${theme === "dark" && "dark"}`}
                  required
                  onChange={handleTitleChange}
                  value={inputIdea.ideaTitle}
                />
                <p>{titleLength}/50</p>
              </div>
              <div className="form-date-container">
                {/* Date de fin */}
                <label htmlFor="date">Date de fin</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className={`input-border ${theme === "dark" && "dark"}`}
                  required
                  value={inputIdea.ideaDateLimit}
                  onChange={(e) =>
                    setInputIdea({
                      ...inputIdea,
                      ideaDateLimit: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-image-container">
                {/* Image */}

                <label htmlFor="idea-image">
                  Télécharger une image de couverture
                </label>

                <div className="image-input-container">
                  <img
                    src={
                      file === "default" ? "/images/default-image.png" : file
                    }
                    alt="default"
                  />
                  <input
                    className={`button-picture ${theme === "dark" && "dark"}`}
                    type="file"
                    id="ideaimage"
                    name="ideaimage"
                    accept="image/png, image/jpeg"
                    onChange={handleUploadImage}
                    onInput={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <label htmlFor="user">Personnes impactées</label>
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

                  {allUsers.map((person) => {
                    return (
                      <tbody key={person.id}>
                        <tr>
                          <td
                            aria-label="image-checkbox"
                            className="checkbox-avatar"
                          >
                            <input
                              type="checkbox"
                              id="user"
                              name="user"
                              value={person.id}
                              onChange={handleChoseUser}
                            />
                            {person.image_profil ? (
                              <img
                                className="avatar"
                                title="Profil"
                                src={`${import.meta.env.VITE_BACKEND}${
                                  person.image_profil
                                }`}
                                alt="profile"
                              />
                            ) : (
                              <img
                                title="Profil"
                                src={
                                  theme === "dark"
                                    ? "/images/icons/avatar_icon_dark.png"
                                    : "/images/icons/avatar_icon.png"
                                }
                                alt="default profile"
                              />
                            )}
                          </td>
                          <td>{person.firstname}</td>
                          <td>{person.lastname}</td>
                          <td>{person.email}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
              <div className="form-description-container">
                {/* personne Déscription */}
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  maxLength="500"
                  placeholder="Votre description"
                  className={`input-border ${theme === "dark" && "dark"}`}
                  onChange={handleDescriptionChange}
                  required
                  value={inputIdea.ideaDescription}
                />
              </div>
              <p className="character-counter-idea">
                {500 - description.length} caractères restants
              </p>
              <div className="buttons-container">
                {/* submit buttons */}
                <input
                  className="button-blue"
                  type="submit"
                  value="Brouillon"
                />
                <input className="button-green" type="submit" value="Publier" />
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
  handleSubmitIdea: PropTypes.func.isRequired,
  usersAssociated: PropTypes.arrayOf(PropTypes.string).isRequired,
  setUsersAssociated: PropTypes.func.isRequired,
  image: PropTypes.string,
  setImage: PropTypes.func.isRequired,
  inputIdea: PropTypes.shape({
    ideaTitle: PropTypes.string.isRequired,
    ideaDateLimit: PropTypes.string.isRequired,
    ideaDescription: PropTypes.string.isRequired,
  }).isRequired,
  setInputIdea: PropTypes.func.isRequired,
};

CreateIdeaModal.defaultProps = {
  image: undefined,
};

export default CreateIdeaModal;
