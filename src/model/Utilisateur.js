class Utilisateur {
    constructor(id, nom, prenom, adresse, email, passwd, role, dateCreation) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.email = email;
        this.passwd = passwd;
        this.role = role;
        this.dateCreation = dateCreation;
    }
}
export default Utilisateur;
