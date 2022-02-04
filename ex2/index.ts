interface Administrateur {
  nom: string;
  email: string;
  ip: string;
  dt_connexion: Date;
  login: string;
  password: string;
}

type UtilisateurAnonyme = Pick<Administrateur, Partial<"nom"> | "ip">;
