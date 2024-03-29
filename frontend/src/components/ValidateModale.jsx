import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ThemeContext } from "../context/ThemeContext";

function ValidateModale({
  type,
  setTypeModal,
  handleClickSubmitButton = null,
  handleClickUpdateSubmitButton,
  handleClickIdeaCancelButton,
  handleDecisionConfirmModal,
  handleReturnToHome,
}) {
  const navigate = useNavigate();
  const button = 1;

  const handleButton = (event) => {
    if (
      type === "modale1" &&
      event.target.value === "button1" &&
      handleClickSubmitButton
    ) {
      handleClickSubmitButton(button);
    } else if (
      type === "modale2" &&
      event.target.value === "button1" &&
      handleClickSubmitButton
    ) {
      navigate("/home");
      handleClickSubmitButton();
    } else if (type === "modale1" && event.target.value === "button2") {
      handleClickIdeaCancelButton();
    } else if (type === "modale4" && event.target.value === "button1") {
      navigate("/home");
      handleDecisionConfirmModal();
    } else if (type === "modale6" && event.target.value === "button1") {
      navigate("/home");
      handleReturnToHome();
    } else if (type === "modale8" && event.target.value === "button1") {
      navigate("/home");
      handleClickUpdateSubmitButton();
    }
  };

  const modals = {
    modale1: {
      title: "Comfirmer la soumission",
      text: "Cette action est irréversible. En cas de modification, merci de contacter l'adminsitrateur",
      logo: "/images/icons/validation.png",
      textButton: "Soumettre",
      textButton2: "Annuler",
    },
    modale2: {
      title: "",
      text: "Bravo ! Ton idée est en attente de validation par l'administrateur",
      logo: "/images/icons/confetti.png",
      textButton: "Accueil",
    },
    modale3: {
      title: "",
      text: "Merci d'avoir soumis l'idée au vote!",
      logo: "/images/icons/confetti.png",
      textButton: "Accueil",
    },
    modale4: {
      title: "",
      text: "Décision envoyée !",
      logo: "/images/icons/validation.png",
      textButton: "Accueil",
    },
    modale5: {
      title: "",
      text: "Décision envoyée !",
      logo: "/images/icons/confetti.png",
      textButton: "Accueil",
    },
    modale6: {
      title: "",
      text: "Modification enregistrée !",
      logo: "/images/icons/validation.png",
      textButton: "Accueil",
    },
    modal7: {
      title: "",
      text: "Decision enregistrée !",
      logo: "/images/icons/validation.png",
      textButton: "Page Administrateur",
    },
    modale8: {
      title: "",
      text: "Merci d'avoir soumis l'idée au vote!",
      logo: "/images/icons/confetti.png",
      textButton: "Accueil",
    },
  };

  const { theme } = useContext(ThemeContext);

  const modalToDisplay = modals[type];

  // function clavier poour touche entrée
  const onValidate = () => {
    setTypeModal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onValidate();
    }
  };

  return (
    <div className="modal" onKeyDown={handleKeyDown} tabIndex={0} role="button">
      <div
        className={`modal-content ${theme === "dark" ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
      >
        <div className="modal-Header">
          <img src={modalToDisplay.logo} alt="Logo" />
          <h4 className="modal-title">{modalToDisplay.title}</h4>
        </div>
        <div className="modal-body">
          <p>{modalToDisplay.text}</p>
        </div>
        <div className="modal-footer">
          <button
            className="button1"
            type="button"
            value="button1"
            onClick={handleButton}
          >
            {modalToDisplay.textButton}
          </button>
        </div>
        {modalToDisplay.textButton2 ? (
          <button
            className="button2"
            type="button"
            onClick={handleButton}
            value="button2"
          >
            {modalToDisplay.textButton2}
          </button>
        ) : null}
      </div>
    </div>
  );
}

ValidateModale.propTypes = {
  type: PropTypes.string.isRequired,
  setTypeModal: PropTypes.func.isRequired,
  handleClickSubmitButton: PropTypes.func,
  handleClickIdeaCancelButton: PropTypes.func,
  handleDecisionConfirmModal: PropTypes.func,
  handleReturnToHome: PropTypes.func,
  handleClickUpdateSubmitButton: PropTypes.func,
};

ValidateModale.defaultProps = {
  handleClickSubmitButton: null,
  handleClickIdeaCancelButton: null,
  handleDecisionConfirmModal: null,
  handleReturnToHome: null,
  handleClickUpdateSubmitButton: null,
};

// importation modale dans pages <ValidateModale type="modale1" setTypeModal={() => console.log("")} />

export default ValidateModale;
