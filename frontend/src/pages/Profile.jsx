import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import ValidateModale from "../components/ValidateModale";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

function Profile() {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  // state to confirm new password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // state to indicate if the passwords match
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);

  // state to show or not the password in the input
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowsConfirmPassword] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isEyeOpenNew, setIsEyeOpenNew] = useState(false);
  const [isEyeOpenConfirm, setIsEyeOpenConfirm] = useState(false);
  const [isOpenModificationModal, setIsOpenModificationModal] = useState(false);

  // state to inform that the email is already used
  const [isErrorMail, setIsErrorMail] = useState(false);
  const [messageErrorMail, setMessageErrorMail] = useState("");

  // state to show or not the popup when an error happens
  const [showpopup, setShowpopup] = useState(false);
  const handlePasswordChange = (event, setPassword) => {
    setPassword(event.target.value);
  };

  // state to lead the client to verify his identity by rewrite his current password
  const [actualPassword, setActualPassword] = useState(false);

  useEffect(() => {
    if (newPassword.length > 0 || confirmPassword.length > 0) {
      if (newPassword === confirmPassword) {
        setMessage("Les mots de passe correspondent");
        setIsMessage(true);
      } else {
        setMessage("Les mots de passe ne correspondent pas");
        setIsMessage(false);
      }
    } else {
      setMessage("");
      setIsMessage(false);
    }
  }, [newPassword, confirmPassword]);

  const handlePut = async (e) => {
    e.preventDefault();

    const userToUpdate = {
      id: user.id,
      image_profil: user.image_profil,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      currentPassword: e.target.currentPassword.value,
      password: e.target.password.value,
      is_administrator: user.is_administrator,
      is_moderator: user.is_moderator,
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/users/${user && user.id}`,
        userToUpdate,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.status === 200) {
        setUser(userToUpdate);
        setIsOpenModificationModal(true);
      } else {
        setShowpopup(true);
      }
    } catch (error) {
      if (error?.response?.data === "Incorrect credentials") {
        setActualPassword(true);
      } else if (error?.response?.data === "Email already exists") {
        setIsErrorMail(true);
        setMessageErrorMail("Cet email est déjà utilisé");
        setTimeout(() => {
          setMessageErrorMail("");
        }, 5000);
        console.error(error);
      } else {
        setIsErrorMail(false);
        setMessageErrorMail("");
      }
    }
  };

  const handleShowPassword = (passwordType) => {
    if (passwordType === "current") {
      setShowPassword(!showPassword);
      setIsEyeOpen((current) => !current);
    } else if (passwordType === "new") {
      setShowNewPassword(!showNewPassword);
      setIsEyeOpenNew((current) => !current);
    } else if (passwordType === "confirm") {
      setShowsConfirmPassword(!showConfirmPassword);
      setIsEyeOpenConfirm((current) => !current);
    }
  };

  const handleReturnToHome = () => {
    navigate("/home");
  };

  // function upload image
  const [image, setImage] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdd = async () => {
    setErrorMessage("");

    if (image === undefined) {
      setErrorMessage("Veuillez choisir une image");
      return;
    }

    const data = new FormData();
    data.append("AvatarImage", image);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/upload/${user && user.id}`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setUser((prevUser) => ({
        ...prevUser,
        image_profil: response.data,
      }));
    } catch (e) {
      setErrorMessage("Insertion échouée");
    }
  };
  const [fileName, setFileName] = useState("");

  return (
    <div>
      <div className="profile-page">
        <div className="home-button">
          <Link to="/home">
            <img
              className="clickable-image"
              src={
                theme === "dark"
                  ? "/images/icons/retour_dark.png"
                  : "/images/icons/retour.png"
              }
              alt="logo_retour"
            />
          </Link>
        </div>
        <div className="profile-form-container">
          <div className="thumbnail">
            <div className="upload-container">
              {user && user.image_profil ? (
                <img
                  src={`${import.meta.env.VITE_BACKEND}${
                    user && user.image_profil
                  }`}
                  alt="profile"
                />
              ) : (
                <img
                  src={
                    theme === "dark"
                      ? "/images/icons/avatar_icon_dark.png"
                      : "/images/icons/avatar_icon.png"
                  }
                  alt="default profile"
                />
              )}
              {errorMessage && <p>{errorMessage}</p>}

              <button type="button" onClick={handleAdd}>
                Changer la photo
              </button>
              <div className="input-upload">
                <input
                  id="file-upload"
                  className="upload-input"
                  type="file"
                  onInput={(e) => {
                    setImage(e.target.files[0]);
                    setFileName(
                      e.target.files[0] ? e.target.files[0].name : ""
                    );
                  }}
                  style={{ display: "none" }} // Cachez l'input
                />
                <label htmlFor="file-upload" className="custom-file-upload">
                  Parcourir
                </label>
                <p className="name-of-image">{fileName || ""}</p>
              </div>
            </div>
          </div>
          {/* div for modal */}
          <div
            className={`${
              isOpenModificationModal ? "" : "hide-modification-modal"
            }`}
          >
            <ValidateModale
              type="modale6"
              setTypeModal={() => console.info("")}
              handleReturnToHome={handleReturnToHome}
            />
          </div>
          {/* div modal ends here */}
          {showpopup && (
            <div className="popup-profile-error ">
              <div className="popup-content-profile-error ">
                <p>La modification a échoué</p>
                <button
                  type="button"
                  className="popup-close-button-profile-error "
                  onClick={() => setShowpopup(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
          {user && (
            <form className="profile-form" onSubmit={handlePut}>
              <div className="profile-form-item">
                <label className="label-profile" htmlFor="firstname">
                  Prénom
                </label>
                <input
                  className="profile-input"
                  type="text"
                  placeholder="Prénom"
                  name="firstname"
                  defaultValue={user && user.firstname}
                />
              </div>
              <div className="profile-form-item">
                <label className="label-profile" htmlFor="lastname">
                  Nom
                </label>
                <input
                  className="profile-input"
                  type="text"
                  placeholder="Nom"
                  name="lastname"
                  defaultValue={user && user.lastname}
                />
              </div>
              <div className="profile-form-item">
                <label className="label-profile" htmlFor="email">
                  Adresse mail
                </label>
                <input
                  className="profile-input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  defaultValue={user && user.email}
                />
                <div className={isErrorMail ? "incorrect" : "correct"}>
                  <p className="message-mail">{messageErrorMail}</p>
                </div>
              </div>

              <div className="profile-form-password">
                <label className="label-profile-pass" htmlFor="password">
                  Changer de mot de passe
                </label>
                <div
                  className={
                    actualPassword
                      ? "container-profile-input-wrong"
                      : "container-profile-input"
                  }
                >
                  <input
                    className="profile-input-pass"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe actuel"
                    name="currentPassword"
                  />
                  <button
                    className="toggle-button"
                    type="button"
                    onClick={() => handleShowPassword("current")}
                  >
                    {isEyeOpen ? (
                      <img
                        className="img-password"
                        src="/images/oeil-ouvert.png"
                        alt="oeil ouvert"
                      />
                    ) : (
                      <img
                        className="img-password"
                        src="/images/oeil-fermé.png"
                        alt="oeil fermé"
                      />
                    )}
                  </button>
                </div>
                <div className="container-profile-input">
                  <input
                    className="profile-input-pass"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Nouveau mot de passe"
                    minLength={6}
                    value={newPassword}
                    onInput={(event) =>
                      handlePasswordChange(event, setNewPassword)
                    }
                  />
                  <button
                    className="toggle-button"
                    type="button"
                    onClick={() => handleShowPassword("new")}
                  >
                    {isEyeOpenNew ? (
                      <img
                        className="img-password"
                        src="/images/oeil-ouvert.png"
                        alt="oeil ouvert"
                      />
                    ) : (
                      <img
                        className="img-password"
                        src="/images/oeil-fermé.png"
                        alt="oeil fermé"
                      />
                    )}
                  </button>
                </div>
                <div className="container-profile-input">
                  <input
                    className="profile-input-pass"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmation du nouveau mot de passe"
                    name="password"
                    minLength={6}
                    value={confirmPassword}
                    onInput={(event) =>
                      handlePasswordChange(event, setConfirmPassword)
                    }
                  />
                  <button
                    className="toggle-button"
                    type="button"
                    onClick={() => handleShowPassword("confirm")}
                  >
                    {isEyeOpenConfirm ? (
                      <img
                        className="img-password"
                        src="/images/oeil-ouvert.png"
                        alt="oeil ouvert"
                      />
                    ) : (
                      <img
                        className="img-password"
                        src="/images/oeil-fermé.png"
                        alt="oeil fermé"
                      />
                    )}
                  </button>
                </div>
                <div className={isMessage ? "correct" : "incorrect"}>
                  <p className="message">{message}</p>
                </div>
              </div>
              <div className="submit-button">
                <button type="submit">Sauvegarder</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
