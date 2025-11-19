document.addEventListener("DOMContentLoaded", () => {
  const statusElement = document.getElementById("js-update-status");

  if (statusElement) {
    // Crée le paragraphe pour afficher l'information
    const lastUpdateP = document.createElement('p');
    
    // Formate la date actuelle
    const now = new Date(); 
    const formattedDate = now.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Injecte l'information
    lastUpdateP.innerHTML = `*Page vérifiée le : <strong>${formattedDate}</strong>. (Mis à jour par l'utilisateur)`;
    
    statusElement.appendChild(lastUpdateP);
  }
});