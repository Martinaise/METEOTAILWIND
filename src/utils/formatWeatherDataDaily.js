
// crétion tableau avectous les donée pour un jour
export const formatWeatherDataDaily = (data) => {
  const dataDaily = [];

  //récup toutes les clés de l'objet dans un tableau
  const dataEntries = Object.keys(data); 
//data contient tous les donée et key les donée d'un champs
  dataEntries.forEach((key, keyIndex) => {
    for (let i = 0; i < data[key].length; i++) {
      if (keyIndex === 0) {
        // first loop, initialise objects
        dataDaily.push({});
      }
// recup la valeur du jour pour cette key
      const dayValue = data[key][i]; 
      // placé la donnée du jour qui correspond au jour en question
      dataDaily[i][key] = dayValue;
    }
  });
  // on met le jour en français
  dataDaily.forEach((data) => {
    const date = new Date(data.time);
    // ici avec getDay on va avoir 0 pour dimance 1 pour lundi ... du coup quand on aura les numéros on saura quel jour nous sommes
    const dayIndex = date.getDay();
    // on transforme  les chiffres el jour ex 0 = dimanche
    data.day = frenchDays[dayIndex];
  });

  // on retour les donées par jour
  return dataDaily;
};
// tableau des jours en francais
const frenchDays = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
