// Coordinates for cities in Krishna District, Andhra Pradesh
export interface CityCoordinate {
  name: string;
  lat: number;
  lng: number;
}

export const cityCoordinates: CityCoordinate[] = [
  { name: "Agiripalli", lat: 16.6833, lng: 80.9167 },
  { name: "Avanigadda", lat: 16.0167, lng: 80.9167 },
  { name: "Challapalli", lat: 16.1167, lng: 81.1333 },
  { name: "Gannavaram", lat: 16.5333, lng: 80.8000 },
  { name: "Gudivada", lat: 16.4333, lng: 80.9833 },
  { name: "Gudlavalleru", lat: 16.3500, lng: 81.0500 },
  { name: "Jaggayyapeta", lat: 16.8833, lng: 80.1000 },
  { name: "Kankipadu", lat: 16.4333, lng: 80.7167 },
  { name: "Koduru", lat: 16.8167, lng: 80.7833 },
  { name: "Kondapalli", lat: 16.6167, lng: 80.5333 },
  { name: "Machilipatnam", lat: 16.1833, lng: 81.1333 },
  { name: "Movva", lat: 16.6000, lng: 80.8833 },
  { name: "Mudinepalli", lat: 16.4500, lng: 80.8500 },
  { name: "Nandigama", lat: 16.7667, lng: 80.2833 },
  { name: "Nuzvid", lat: 16.7833, lng: 80.3500 },
  { name: "Pamarru", lat: 16.2833, lng: 81.0333 },
  { name: "Pedana", lat: 16.2500, lng: 81.1500 },
  { name: "Penamaluru", lat: 16.5167, lng: 80.6500 },
  { name: "Thotlavalluru", lat: 16.4167, lng: 80.9000 },
  { name: "Tiruvuru", lat: 16.9500, lng: 80.4500 },
  { name: "Vuyyuru", lat: 16.3667, lng: 80.8500 },
  { name: "Vissannapet", lat: 16.8000, lng: 80.1500 },
  { name: "Ibrahimpatnam", lat: 16.4833, lng: 80.4500 },
  { name: "Paritala", lat: 16.7000, lng: 80.6000 },
  { name: "Kaikaluru", lat: 16.5500, lng: 81.2167 },
  { name: "Mandavalli", lat: 16.1500, lng: 80.9500 },
  { name: "Bantumilli", lat: 16.2000, lng: 81.0000 },
  { name: "Kruthivennu", lat: 16.2667, lng: 81.3000 },
  { name: "Kalidindi", lat: 16.0833, lng: 81.4833 },
  { name: "Mopidevi", lat: 16.1000, lng: 81.5000 },
  { name: "Nagayalanka", lat: 16.1833, lng: 81.3500 },
  { name: "Veerullapadu", lat: 16.4000, lng: 81.1000 },
  { name: "Vijayawada (Rural)", lat: 16.5167, lng: 80.6167 },
  { name: "Kanchikacherla", lat: 16.4167, lng: 80.6333 },
  { name: "Pamidimukkala", lat: 16.3833, lng: 80.7500 },
  { name: "Avutapalli Peda", lat: 16.3500, lng: 80.8000 },
  { name: "Machilipatnam (Rural)", lat: 16.2000, lng: 81.1000 },
  { name: "Edupugallu", lat: 16.4500, lng: 81.0000 },
  { name: "Kanuru", lat: 16.5000, lng: 80.6000 },
  { name: "Ramavarappadu", lat: 16.4833, lng: 80.5833 },
  { name: "Tadanki", lat: 16.0500, lng: 80.4500 },
  { name: "Gollapudi", lat: 16.5500, lng: 80.6167 },
  { name: "Gunadala", lat: 16.5167, lng: 80.6333 },
  { name: "Penuganchiprolu", lat: 16.6500, lng: 80.9500 },
  { name: "Musunuru", lat: 16.3167, lng: 80.4167 },
  { name: "Vallurupalem", lat: 16.2333, lng: 80.9833 },
  { name: "Pedaprolu", lat: 16.7333, lng: 80.1833 }
];

export const getCityCoordinate = (cityName: string): CityCoordinate | undefined => {
  return cityCoordinates.find(city => city.name === cityName);
};