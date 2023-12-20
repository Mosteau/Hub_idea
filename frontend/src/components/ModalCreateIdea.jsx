function ModalCreateIdea() {
  return (
    <div className="create-idea-container">
      <div className="icon-close-container">
        <img src="images/icons/icon_cross.png" alt="cross" />
      </div>
      <h1>Votre idée</h1>
      <div className="container">
        <div className="form-container">
          <form action="">
            <div className="form-title-container">
              {/* titre */}
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                name="title"
                id="title"
                className="input-border"
              />
            </div>
            <div className="form-date-container">
              {/* Date de fin */}
              <label htmlFor="date">Date de fin</label>
              <input
                type="date"
                name="date"
                id="date"
                className="input-border"
              />
            </div>

            <div className="form-image-container">
              {/* Image */}

              <label htmlFor="idea-image">
                Télécharger une image de couverture
              </label>

              <div className="image-input-container">
                <img src="images/default-image.png" alt="default" />
                <input
                  type="file"
                  id="idea-image"
                  name="idea-image"
                  accept="image/png, image/jpeg"
                />
              </div>
            </div>
            <label htmlFor="user">Personne impactées</label>
            <div className="form-impacted-person-container">
              {/* Personne impactées */}
              <table>
                <tr>
                  <td aria-label="image-checkbox">&nbsp;</td>
                  <th>Prénom</th>
                  <th>Nom</th>
                  <th>Email</th>
                </tr>
                <tr>
                  <td aria-label="image-checkbox" className="checkbox-avatar">
                    <input type="checkbox" id="user" name="user" />
                    <img src="images/hugo.png" alt="" />
                  </td>
                  <td>Hugo</td>
                  <td>lastname</td>
                  <td>hugo@gmail.com</td>
                </tr>
                <tr>
                  <td aria-label="image-checkbox" className="checkbox-avatar">
                    <input type="checkbox" id="user" name="user" />
                    <img src="images/hugo.png" alt="" />
                  </td>
                  <td>Hugo</td>
                  <td>lastname</td>
                  <td>hugo@gmail.com</td>
                </tr>
                <tr>
                  <td aria-label="image-checkbox" className="checkbox-avatar">
                    <input type="checkbox" id="user" name="user" />
                    <img src="images/hugo.png" alt="" />
                  </td>
                  <td>Hugo</td>
                  <td>lastname</td>
                  <td>hugo@gmail.com</td>
                </tr>
                <tr>
                  <td aria-label="image-checkbox" className="checkbox-avatar">
                    <input type="checkbox" id="user" name="user" />
                    <img src="images/hugo.png" alt="" />
                  </td>
                  <td>Hugo</td>
                  <td>lastname</td>
                  <td>hugo@gmail.com</td>
                </tr>
              </table>
            </div>
            <div className="form-description-container">
              {/* personne Déscription */}
              <label htmlFor="description">Déscription</label>
              <textarea
                id="description"
                name="description"
                className="input-border"
              />
            </div>
            <div className="buttons-container">
              {/* submit buttons */}
              <input className="button-blue" type="submit" value="Brouillon" />
              <input className="button-green" type="submit" value="Publier" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalCreateIdea;
