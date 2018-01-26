(function() {
  'use strict';

  angular.module('app')
  .factory('BreedService',BreedService);

  function BreedService(){
    var service = this;
    var list = [
      {
        "id": 1,
        "name": "Affenpinscher",
        "description": null
      },
      {
        "id": 2,
        "name": "Afghan Hound",
        "description": null
      },
      {
        "id": 3,
        "name": "Aidi",
        "description": null
      },
      {
        "id": 4,
        "name": "Airedale Terrier",
        "description": null
      },
      {
        "id": 5,
        "name": "Akbash Dog",
        "description": null
      },
      {
        "id": 6,
        "name": "Alano Español",
        "description": null
      },
      {
        "id": 7,
        "name": "Alaskan Klee Kai",
        "description": null
      },
      {
        "id": 8,
        "name": "Alaskan Malamute",
        "description": null
      },
      {
        "id": 9,
        "name": "Alpine Dachsbracke",
        "description": null
      },
      {
        "id": 10,
        "name": "Alpine Spaniel",
        "description": null
      },
      {
        "id": 11,
        "name": "American Bulldog",
        "description": null
      },
      {
        "id": 12,
        "name": "American Cocker Spaniel",
        "description": null
      },
      {
        "id": 13,
        "name": "American Eskimo Dog",
        "description": null
      },
      {
        "id": 14,
        "name": "American Foxhound",
        "description": null
      },
      {
        "id": 15,
        "name": "American Hairless Terrier",
        "description": null
      },
      {
        "id": 16,
        "name": "American Pit Bull Terrier",
        "description": null
      },
      {
        "id": 17,
        "name": "American Staffordshire Terrier",
        "description": null
      },
      {
        "id": 18,
        "name": "American Water Spaniel",
        "description": null
      },
      {
        "id": 19,
        "name": "Anglo-Français de Petite Vénerie",
        "description": null
      },
      {
        "id": 20,
        "name": "Appenzeller Sennenhund",
        "description": null
      },
      {
        "id": 21,
        "name": "Ariege Pointer",
        "description": null
      },
      {
        "id": 22,
        "name": "Ariegeois",
        "description": null
      },
      {
        "id": 23,
        "name": "Armant",
        "description": null
      },
      {
        "id": 24,
        "name": "Armenian Gampr dog",
        "description": null
      },
      {
        "id": 25,
        "name": "Artois Hound",
        "description": null
      },
      {
        "id": 26,
        "name": "Australian Cattle Dog",
        "description": null
      },
      {
        "id": 27,
        "name": "Australian Kelpie",
        "description": null
      },
      {
        "id": 28,
        "name": "Australian Shepherd",
        "description": null
      },
      {
        "id": 29,
        "name": "Australian Silky Terrier",
        "description": null
      },
      {
        "id": 30,
        "name": "Australian Stumpy Tail Cattle Dog",
        "description": null
      },
      {
        "id": 31,
        "name": "Australian Terrier",
        "description": null
      },
      {
        "id": 32,
        "name": "Azawakh",
        "description": null
      },
      {
        "id": 33,
        "name": "Bakharwal Dog",
        "description": null
      },
      {
        "id": 34,
        "name": "Barbet",
        "description": null
      },
      {
        "id": 35,
        "name": "Basenji",
        "description": null
      },
      {
        "id": 36,
        "name": "Basque Shepherd Dog",
        "description": null
      },
      {
        "id": 37,
        "name": "Basset Artésien Normand",
        "description": null
      },
      {
        "id": 38,
        "name": "Basset Bleu de Gascogne",
        "description": null
      },
      {
        "id": 39,
        "name": "Basset Fauve de Bretagne",
        "description": null
      },
      {
        "id": 40,
        "name": "Basset Hound",
        "description": null
      },
      {
        "id": 41,
        "name": "Bavarian Mountain Hound",
        "description": null
      },
      {
        "id": 42,
        "name": "Beagle",
        "description": null
      },
      {
        "id": 43,
        "name": "Beagle-Harrier",
        "description": null
      },
      {
        "id": 44,
        "name": "Bearded Collie",
        "description": null
      },
      {
        "id": 45,
        "name": "Beauceron",
        "description": null
      },
      {
        "id": 46,
        "name": "Bedlington Terrier",
        "description": null
      },
      {
        "id": 47,
        "name": "Belgian Shepherd Dog (Groenendael)",
        "description": null
      },
      {
        "id": 48,
        "name": "Belgian Shepherd Dog (Laekenois)",
        "description": null
      },
      {
        "id": 49,
        "name": "Belgian Shepherd Dog (Malinois)",
        "description": null
      },
      {
        "id": 50,
        "name": "Bergamasco Shepherd",
        "description": null
      },
      {
        "id": 51,
        "name": "Berger Blanc Suisse",
        "description": null
      },
      {
        "id": 52,
        "name": "Berger Picard",
        "description": null
      },
      {
        "id": 53,
        "name": "Berner Laufhund",
        "description": null
      },
      {
        "id": 54,
        "name": "Bernese Mountain Dog",
        "description": null
      },
      {
        "id": 55,
        "name": "Billy",
        "description": null
      },
      {
        "id": 56,
        "name": "Black and Tan Coonhound",
        "description": null
      },
      {
        "id": 57,
        "name": "Black and Tan Virginia Foxhound",
        "description": null
      },
      {
        "id": 58,
        "name": "Black Norwegian Elkhound",
        "description": null
      },
      {
        "id": 59,
        "name": "Black Russian Terrier",
        "description": null
      },
      {
        "id": 60,
        "name": "Bloodhound",
        "description": null
      },
      {
        "id": 61,
        "name": "Blue Lacy",
        "description": null
      },
      {
        "id": 62,
        "name": "Blue Paul Terrier",
        "description": null
      },
      {
        "id": 63,
        "name": "Boerboel",
        "description": null
      },
      {
        "id": 64,
        "name": "Bohemian Shepherd",
        "description": null
      },
      {
        "id": 65,
        "name": "Bolognese",
        "description": null
      },
      {
        "id": 66,
        "name": "Border Collie",
        "description": null
      },
      {
        "id": 67,
        "name": "Border Terrier",
        "description": null
      },
      {
        "id": 68,
        "name": "Borzoi",
        "description": null
      },
      {
        "id": 69,
        "name": "Boston Terrier",
        "description": null
      },
      {
        "id": 70,
        "name": "Bouvier des Ardennes",
        "description": null
      },
      {
        "id": 71,
        "name": "Bouvier des Flandres",
        "description": null
      },
      {
        "id": 72,
        "name": "Boxer",
        "description": null
      },
      {
        "id": 73,
        "name": "Boykin Spaniel",
        "description": null
      },
      {
        "id": 74,
        "name": "Bracco Italiano",
        "description": null
      },
      {
        "id": 75,
        "name": "Braque d'Auvergne",
        "description": null
      },
      {
        "id": 76,
        "name": "Braque du Bourbonnais",
        "description": null
      },
      {
        "id": 77,
        "name": "Braque du Puy",
        "description": null
      },
      {
        "id": 78,
        "name": "Braque Francais",
        "description": null
      },
      {
        "id": 79,
        "name": "Braque Saint-Germain",
        "description": null
      },
      {
        "id": 80,
        "name": "Brazilian Terrier",
        "description": null
      },
      {
        "id": 81,
        "name": "Briard",
        "description": null
      },
      {
        "id": 82,
        "name": "Briquet Griffon Vendéen",
        "description": null
      },
      {
        "id": 83,
        "name": "Brittany",
        "description": null
      },
      {
        "id": 84,
        "name": "Broholmer",
        "description": null
      },
      {
        "id": 85,
        "name": "Bruno Jura Hound",
        "description": null
      },
      {
        "id": 86,
        "name": "Bucovina Shepherd Dog",
        "description": null
      },
      {
        "id": 87,
        "name": "Bull and Terrier",
        "description": null
      },
      {
        "id": 89,
        "name": "Bull Terrier",
        "description": null
      },
      {
        "id": 88,
        "name": "Bull Terrier (Miniature)",
        "description": null
      },
      {
        "id": 90,
        "name": "Bulldog",
        "description": null
      },
      {
        "id": 91,
        "name": "Bullenbeisser",
        "description": null
      },
      {
        "id": 92,
        "name": "Bullmastiff",
        "description": null
      },
      {
        "id": 93,
        "name": "Bully Kutta",
        "description": null
      },
      {
        "id": 94,
        "name": "Burgos Pointer",
        "description": null
      },
      {
        "id": 95,
        "name": "Cairn Terrier",
        "description": null
      },
      {
        "id": 96,
        "name": "Canaan Dog",
        "description": null
      },
      {
        "id": 97,
        "name": "Canadian Eskimo Dog",
        "description": null
      },
      {
        "id": 98,
        "name": "Cane Corso",
        "description": null
      },
      {
        "id": 134,
        "name": "Cão da Serra de Aires",
        "description": null
      },
      {
        "id": 135,
        "name": "Cão de Castro Laboreiro",
        "description": null
      },
      {
        "id": 136,
        "name": "Cão Fila de São Miguel",
        "description": null
      },
      {
        "id": 99,
        "name": "Cardigan Welsh Corgi",
        "description": null
      },
      {
        "id": 100,
        "name": "Carolina Dog",
        "description": null
      },
      {
        "id": 101,
        "name": "Carpathian Shepherd Dog",
        "description": null
      },
      {
        "id": 102,
        "name": "Catahoula Cur",
        "description": null
      },
      {
        "id": 103,
        "name": "Catalan Sheepdog",
        "description": null
      },
      {
        "id": 104,
        "name": "Caucasian Shepherd Dog",
        "description": null
      },
      {
        "id": 105,
        "name": "Cavalier King Charles Spaniel",
        "description": null
      },
      {
        "id": 106,
        "name": "Central Asian Shepherd Dog",
        "description": null
      },
      {
        "id": 107,
        "name": "Cesky Fousek",
        "description": null
      },
      {
        "id": 108,
        "name": "Cesky Terrier",
        "description": null
      },
      {
        "id": 109,
        "name": "Chesapeake Bay Retriever",
        "description": null
      },
      {
        "id": 110,
        "name": "Chien Français Blanc et Noir",
        "description": null
      },
      {
        "id": 111,
        "name": "Chien Français Blanc et Orange",
        "description": null
      },
      {
        "id": 112,
        "name": "Chien Français Tricolore",
        "description": null
      },
      {
        "id": 113,
        "name": "Chien-gris",
        "description": null
      },
      {
        "id": 114,
        "name": "Chihuahua",
        "description": null
      },
      {
        "id": 115,
        "name": "Chilean Fox Terrier",
        "description": null
      },
      {
        "id": 116,
        "name": "Chinese Chongqing Dog",
        "description": null
      },
      {
        "id": 117,
        "name": "Chinese Crested Dog",
        "description": null
      },
      {
        "id": 118,
        "name": "Chinese Imperial Dog",
        "description": null
      },
      {
        "id": 119,
        "name": "Chinook",
        "description": null
      },
      {
        "id": 120,
        "name": "Chippiparai",
        "description": null
      },
      {
        "id": 121,
        "name": "Chow Chow",
        "description": null
      },
      {
        "id": 122,
        "name": "Cierny Sery",
        "description": null
      },
      {
        "id": 123,
        "name": "Cimarrón Uruguayo",
        "description": null
      },
      {
        "id": 124,
        "name": "Cirneco dell'Etna",
        "description": null
      },
      {
        "id": 125,
        "name": "Clumber Spaniel",
        "description": null
      },
      {
        "id": 126,
        "name": "Combai",
        "description": null
      },
      {
        "id": 127,
        "name": "Cordoba Fighting Dog",
        "description": null
      },
      {
        "id": 128,
        "name": "Coton de Tulear",
        "description": null
      },
      {
        "id": 129,
        "name": "Cretan Hound",
        "description": null
      },
      {
        "id": 130,
        "name": "Croatian Sheepdog",
        "description": null
      },
      {
        "id": 131,
        "name": "Cumberland Sheepdog",
        "description": null
      },
      {
        "id": 132,
        "name": "Curly Coated Retriever",
        "description": null
      },
      {
        "id": 133,
        "name": "Cursinu",
        "description": null
      },
      {
        "id": 137,
        "name": "Dachshund",
        "description": null
      },
      {
        "id": 138,
        "name": "Dalmatian",
        "description": null
      },
      {
        "id": 139,
        "name": "Dandie Dinmont Terrier",
        "description": null
      },
      {
        "id": 140,
        "name": "Danish Swedish Farmdog",
        "description": null
      },
      {
        "id": 141,
        "name": "Deutsche Bracke",
        "description": null
      },
      {
        "id": 142,
        "name": "Doberman Pinscher",
        "description": null
      },
      {
        "id": 143,
        "name": "Dogo Argentino",
        "description": null
      },
      {
        "id": 144,
        "name": "Dogo Cubano",
        "description": null
      },
      {
        "id": 145,
        "name": "Dogue de Bordeaux",
        "description": null
      },
      {
        "id": 146,
        "name": "Drentse Patrijshond",
        "description": null
      },
      {
        "id": 147,
        "name": "Drever",
        "description": null
      },
      {
        "id": 148,
        "name": "Dunker",
        "description": null
      },
      {
        "id": 149,
        "name": "Dutch Shepherd Dog",
        "description": null
      },
      {
        "id": 150,
        "name": "Dutch Smoushond",
        "description": null
      },
      {
        "id": 151,
        "name": "East Siberian Laika",
        "description": null
      },
      {
        "id": 152,
        "name": "East-European Shepherd",
        "description": null
      },
      {
        "id": 153,
        "name": "Elo",
        "description": null
      },
      {
        "id": 154,
        "name": "English Cocker Spaniel",
        "description": null
      },
      {
        "id": 155,
        "name": "English Foxhound",
        "description": null
      },
      {
        "id": 156,
        "name": "English Mastiff",
        "description": null
      },
      {
        "id": 157,
        "name": "English Setter",
        "description": null
      },
      {
        "id": 158,
        "name": "English Shepherd",
        "description": null
      },
      {
        "id": 159,
        "name": "English Springer Spaniel",
        "description": null
      },
      {
        "id": 160,
        "name": "English Toy Terrier (Black &amp; Tan)",
        "description": null
      },
      {
        "id": 161,
        "name": "English Water Spaniel",
        "description": null
      },
      {
        "id": 162,
        "name": "English White Terrier",
        "description": null
      },
      {
        "id": 163,
        "name": "Entlebucher Mountain Dog",
        "description": null
      },
      {
        "id": 164,
        "name": "Estonian Hound",
        "description": null
      },
      {
        "id": 165,
        "name": "Estrela Mountain Dog",
        "description": null
      },
      {
        "id": 166,
        "name": "Eurasier",
        "description": null
      },
      {
        "id": 167,
        "name": "Field Spaniel",
        "description": null
      },
      {
        "id": 168,
        "name": "Fila Brasileiro",
        "description": null
      },
      {
        "id": 169,
        "name": "Finnish Hound",
        "description": null
      },
      {
        "id": 170,
        "name": "Finnish Lapphund",
        "description": null
      },
      {
        "id": 171,
        "name": "Finnish Spitz",
        "description": null
      },
      {
        "id": 172,
        "name": "Flat-Coated Retriever",
        "description": null
      },
      {
        "id": 173,
        "name": "Formosan Mountain Dog",
        "description": null
      },
      {
        "id": 174,
        "name": "Fox Terrier (Smooth)",
        "description": null
      },
      {
        "id": 175,
        "name": "French Bulldog",
        "description": null
      },
      {
        "id": 176,
        "name": "French Spaniel",
        "description": null
      },
      {
        "id": 177,
        "name": "Galgo Español",
        "description": null
      },
      {
        "id": 178,
        "name": "Gascon Saintongeois",
        "description": null
      },
      {
        "id": 179,
        "name": "German Longhaired Pointer",
        "description": null
      },
      {
        "id": 180,
        "name": "German Pinscher",
        "description": null
      },
      {
        "id": 181,
        "name": "German Shepherd",
        "description": null
      },
      {
        "id": 182,
        "name": "German Shorthaired Pointer",
        "description": null
      },
      {
        "id": 183,
        "name": "German Spaniel",
        "description": null
      },
      {
        "id": 184,
        "name": "German Spitz",
        "description": null
      },
      {
        "id": 185,
        "name": "German Wirehaired Pointer",
        "description": null
      },
      {
        "id": 186,
        "name": "Giant Schnauzer",
        "description": null
      },
      {
        "id": 187,
        "name": "Glen of Imaal Terrier",
        "description": null
      },
      {
        "id": 188,
        "name": "Golden Retriever",
        "description": null
      },
      {
        "id": 189,
        "name": "Gordon Setter",
        "description": null
      },
      {
        "id": 190,
        "name": "Gran Mastín de Borínquen",
        "description": null
      },
      {
        "id": 191,
        "name": "Grand Anglo-Français Blanc et Noir",
        "description": null
      },
      {
        "id": 192,
        "name": "Grand Anglo-Français Blanc et Orange",
        "description": null
      },
      {
        "id": 193,
        "name": "Grand Anglo-Français Tricolore",
        "description": null
      },
      {
        "id": 194,
        "name": "Grand Basset Griffon Vendéen",
        "description": null
      },
      {
        "id": 195,
        "name": "Grand Bleu de Gascogne",
        "description": null
      },
      {
        "id": 196,
        "name": "Grand Griffon Vendéen",
        "description": null
      },
      {
        "id": 197,
        "name": "Great Dane",
        "description": null
      },
      {
        "id": 198,
        "name": "Great Pyrenees",
        "description": null
      },
      {
        "id": 199,
        "name": "Greater Swiss Mountain Dog",
        "description": null
      },
      {
        "id": 200,
        "name": "Greek Harehound",
        "description": null
      },
      {
        "id": 201,
        "name": "Greenland Dog",
        "description": null
      },
      {
        "id": 202,
        "name": "Greyhound",
        "description": null
      },
      {
        "id": 203,
        "name": "Griffon Bleu de Gascogne",
        "description": null
      },
      {
        "id": 204,
        "name": "Griffon Bruxellois",
        "description": null
      },
      {
        "id": 205,
        "name": "Griffon Fauve de Bretagne",
        "description": null
      },
      {
        "id": 206,
        "name": "Griffon Nivernais",
        "description": null
      },
      {
        "id": 207,
        "name": "Hamiltonstövare",
        "description": null
      },
      {
        "id": 208,
        "name": "Hanover Hound",
        "description": null
      },
      {
        "id": 209,
        "name": "Hare Indian Dog",
        "description": null
      },
      {
        "id": 210,
        "name": "Harrier",
        "description": null
      },
      {
        "id": 211,
        "name": "Havanese",
        "description": null
      },
      {
        "id": 212,
        "name": "Hawaiian Poi Dog",
        "description": null
      },
      {
        "id": 213,
        "name": "Himalayan Sheepdog",
        "description": null
      },
      {
        "id": 214,
        "name": "Hokkaido",
        "description": null
      },
      {
        "id": 215,
        "name": "Hovawart",
        "description": null
      },
      {
        "id": 216,
        "name": "Huntaway",
        "description": null
      },
      {
        "id": 217,
        "name": "Hygenhund",
        "description": null
      },
      {
        "id": 218,
        "name": "Ibizan Hound",
        "description": null
      },
      {
        "id": 219,
        "name": "Icelandic Sheepdog",
        "description": null
      },
      {
        "id": 220,
        "name": "Indian pariah dog",
        "description": null
      },
      {
        "id": 221,
        "name": "Indian Spitz",
        "description": null
      },
      {
        "id": 222,
        "name": "Irish Red and White Setter",
        "description": null
      },
      {
        "id": 223,
        "name": "Irish Setter",
        "description": null
      },
      {
        "id": 224,
        "name": "Irish Terrier",
        "description": null
      },
      {
        "id": 225,
        "name": "Irish Water Spaniel",
        "description": null
      },
      {
        "id": 226,
        "name": "Irish Wolfhound",
        "description": null
      },
      {
        "id": 227,
        "name": "Istrian Coarse-haired Hound",
        "description": null
      },
      {
        "id": 228,
        "name": "Istrian Shorthaired Hound",
        "description": null
      },
      {
        "id": 229,
        "name": "Italian Greyhound",
        "description": null
      },
      {
        "id": 230,
        "name": "Jack Russell Terrier",
        "description": null
      },
      {
        "id": 231,
        "name": "Jagdterrier",
        "description": null
      },
      {
        "id": 232,
        "name": "Jämthund",
        "description": null
      },
      {
        "id": 233,
        "name": "Kai Ken",
        "description": null
      },
      {
        "id": 234,
        "name": "Kaikadi",
        "description": null
      },
      {
        "id": 235,
        "name": "Kanni",
        "description": null
      },
      {
        "id": 236,
        "name": "Karelian Bear Dog",
        "description": null
      },
      {
        "id": 237,
        "name": "Karst Shepherd",
        "description": null
      },
      {
        "id": 238,
        "name": "Keeshond",
        "description": null
      },
      {
        "id": 239,
        "name": "Kerry Beagle",
        "description": null
      },
      {
        "id": 240,
        "name": "Kerry Blue Terrier",
        "description": null
      },
      {
        "id": 241,
        "name": "King Charles Spaniel",
        "description": null
      },
      {
        "id": 242,
        "name": "King Shepherd",
        "description": null
      },
      {
        "id": 243,
        "name": "Kintamani",
        "description": null
      },
      {
        "id": 244,
        "name": "Kishu",
        "description": null
      },
      {
        "id": 245,
        "name": "Komondor",
        "description": null
      },
      {
        "id": 246,
        "name": "Kooikerhondje",
        "description": null
      },
      {
        "id": 247,
        "name": "Koolie",
        "description": null
      },
      {
        "id": 248,
        "name": "Korean Jindo Dog",
        "description": null
      },
      {
        "id": 249,
        "name": "Kromfohrländer",
        "description": null
      },
      {
        "id": 250,
        "name": "Kumaon Mastiff",
        "description": null
      },
      {
        "id": 251,
        "name": "Kurī",
        "description": null
      },
      {
        "id": 252,
        "name": "Kuvasz",
        "description": null
      },
      {
        "id": 253,
        "name": "Kyi-Leo",
        "description": null
      },
      {
        "id": 254,
        "name": "Labrador Husky",
        "description": null
      },
      {
        "id": 255,
        "name": "Labrador Retriever",
        "description": null
      },
      {
        "id": 256,
        "name": "Lagotto Romagnolo",
        "description": null
      },
      {
        "id": 257,
        "name": "Lakeland Terrier",
        "description": null
      },
      {
        "id": 258,
        "name": "Lancashire Heeler",
        "description": null
      },
      {
        "id": 259,
        "name": "Landseer",
        "description": null
      },
      {
        "id": 260,
        "name": "Lapponian Herder",
        "description": null
      },
      {
        "id": 261,
        "name": "Large Münsterländer",
        "description": null
      },
      {
        "id": 262,
        "name": "Leonberger",
        "description": null
      },
      {
        "id": 263,
        "name": "Lhasa Apso",
        "description": null
      },
      {
        "id": 264,
        "name": "Lithuanian Hound",
        "description": null
      },
      {
        "id": 265,
        "name": "Longhaired Whippet",
        "description": null
      },
      {
        "id": 266,
        "name": "Löwchen",
        "description": null
      },
      {
        "id": 267,
        "name": "Mahratta Greyhound",
        "description": null
      },
      {
        "id": 268,
        "name": "Maltese",
        "description": null
      },
      {
        "id": 269,
        "name": "Manchester Terrier",
        "description": null
      },
      {
        "id": 270,
        "name": "Maremma Sheepdog",
        "description": null
      },
      {
        "id": 271,
        "name": "McNab",
        "description": null
      },
      {
        "id": 272,
        "name": "Mexican Hairless Dog",
        "description": null
      },
      {
        "id": 273,
        "name": "Miniature American Shepherd",
        "description": null
      },
      {
        "id": 274,
        "name": "Miniature Australian Shepherd",
        "description": null
      },
      {
        "id": 275,
        "name": "Miniature Fox Terrier",
        "description": null
      },
      {
        "id": 276,
        "name": "Miniature Pinscher",
        "description": null
      },
      {
        "id": 277,
        "name": "Miniature Schnauzer",
        "description": null
      },
      {
        "id": 278,
        "name": "Miniature Shar Pei",
        "description": null
      },
      {
        "id": 279,
        "name": "Molossus",
        "description": null
      },
      {
        "id": 280,
        "name": "Montenegrin Mountain Hound",
        "description": null
      },
      {
        "id": 281,
        "name": "Moscow Watchdog",
        "description": null
      },
      {
        "id": 282,
        "name": "Moscow Water Dog",
        "description": null
      },
      {
        "id": 283,
        "name": "Mountain Cur",
        "description": null
      },
      {
        "id": 284,
        "name": "Mucuchies",
        "description": null
      },
      {
        "id": 285,
        "name": "Mudhol Hound",
        "description": null
      },
      {
        "id": 286,
        "name": "Mudi",
        "description": null
      },
      {
        "id": 287,
        "name": "Neapolitan Mastiff",
        "description": null
      },
      {
        "id": 288,
        "name": "New Zealand Heading Dog",
        "description": null
      },
      {
        "id": 289,
        "name": "Newfoundland",
        "description": null
      },
      {
        "id": 290,
        "name": "Norfolk Spaniel",
        "description": null
      },
      {
        "id": 291,
        "name": "Norfolk Terrier",
        "description": null
      },
      {
        "id": 292,
        "name": "Norrbottenspets",
        "description": null
      },
      {
        "id": 293,
        "name": "North Country Beagle",
        "description": null
      },
      {
        "id": 294,
        "name": "Northern Inuit Dog",
        "description": null
      },
      {
        "id": 295,
        "name": "Norwegian Buhund",
        "description": null
      },
      {
        "id": 296,
        "name": "Norwegian Elkhound",
        "description": null
      },
      {
        "id": 297,
        "name": "Norwegian Lundehund",
        "description": null
      },
      {
        "id": 298,
        "name": "Norwich Terrier",
        "description": null
      },
      {
        "id": 299,
        "name": "Old Croatian Sighthound",
        "description": null
      },
      {
        "id": 300,
        "name": "Old Danish Pointer",
        "description": null
      },
      {
        "id": 301,
        "name": "Old English Sheepdog",
        "description": null
      },
      {
        "id": 302,
        "name": "Old English Terrier",
        "description": null
      },
      {
        "id": 303,
        "name": "Old German Shepherd Dog",
        "description": null
      },
      {
        "id": 304,
        "name": "Olde English Bulldogge",
        "description": null
      },
      {
        "id": 305,
        "name": "Otterhound",
        "description": null
      },
      {
        "id": 306,
        "name": "Pachon Navarro",
        "description": null
      },
      {
        "id": 307,
        "name": "Paisley Terrier",
        "description": null
      },
      {
        "id": 308,
        "name": "Pandikona",
        "description": null
      },
      {
        "id": 309,
        "name": "Papillon",
        "description": null
      },
      {
        "id": 310,
        "name": "Parson Russell Terrier",
        "description": null
      },
      {
        "id": 311,
        "name": "Patterdale Terrier",
        "description": null
      },
      {
        "id": 312,
        "name": "Pekingese",
        "description": null
      },
      {
        "id": 313,
        "name": "Pembroke Welsh Corgi",
        "description": null
      },
      {
        "id": 314,
        "name": "Perro de Presa Canario",
        "description": null
      },
      {
        "id": 315,
        "name": "Perro de Presa Mallorquin",
        "description": null
      },
      {
        "id": 316,
        "name": "Peruvian Hairless Dog",
        "description": null
      },
      {
        "id": 317,
        "name": "Petit Basset Griffon Vendéen",
        "description": null
      },
      {
        "id": 318,
        "name": "Petit Bleu de Gascogne",
        "description": null
      },
      {
        "id": 319,
        "name": "Phalène",
        "description": null
      },
      {
        "id": 320,
        "name": "Pharaoh Hound",
        "description": null
      },
      {
        "id": 321,
        "name": "Phu Quoc ridgeback dog",
        "description": null
      },
      {
        "id": 322,
        "name": "Picardy Spaniel",
        "description": null
      },
      {
        "id": 323,
        "name": "Plott Hound",
        "description": null
      },
      {
        "id": 324,
        "name": "Podenco Canario",
        "description": null
      },
      {
        "id": 325,
        "name": "Pointer (dog breed)",
        "description": null
      },
      {
        "id": 326,
        "name": "Polish Greyhound",
        "description": null
      },
      {
        "id": 327,
        "name": "Polish Hound",
        "description": null
      },
      {
        "id": 328,
        "name": "Polish Hunting Dog",
        "description": null
      },
      {
        "id": 329,
        "name": "Polish Lowland Sheepdog",
        "description": null
      },
      {
        "id": 330,
        "name": "Polish Tatra Sheepdog",
        "description": null
      },
      {
        "id": 331,
        "name": "Pomeranian",
        "description": null
      },
      {
        "id": 332,
        "name": "Pont-Audemer Spaniel",
        "description": null
      },
      {
        "id": 333,
        "name": "Poodle",
        "description": null
      },
      {
        "id": 334,
        "name": "Porcelaine",
        "description": null
      },
      {
        "id": 335,
        "name": "Portuguese Podengo",
        "description": null
      },
      {
        "id": 336,
        "name": "Portuguese Pointer",
        "description": null
      },
      {
        "id": 337,
        "name": "Portuguese Water Dog",
        "description": null
      },
      {
        "id": 338,
        "name": "Posavac Hound",
        "description": null
      },
      {
        "id": 339,
        "name": "Pražský Krysařík",
        "description": null
      },
      {
        "id": 340,
        "name": "Pudelpointer",
        "description": null
      },
      {
        "id": 341,
        "name": "Pug",
        "description": null
      },
      {
        "id": 342,
        "name": "Puli",
        "description": null
      },
      {
        "id": 343,
        "name": "Pumi",
        "description": null
      },
      {
        "id": 344,
        "name": "Pungsan Dog",
        "description": null
      },
      {
        "id": 345,
        "name": "Pyrenean Mastiff",
        "description": null
      },
      {
        "id": 346,
        "name": "Pyrenean Shepherd",
        "description": null
      },
      {
        "id": 347,
        "name": "Rafeiro do Alentejo",
        "description": null
      },
      {
        "id": 348,
        "name": "Rajapalayam",
        "description": null
      },
      {
        "id": 349,
        "name": "Rampur Greyhound",
        "description": null
      },
      {
        "id": 350,
        "name": "Rastreador Brasileiro",
        "description": null
      },
      {
        "id": 351,
        "name": "Rat Terrier",
        "description": null
      },
      {
        "id": 352,
        "name": "Ratonero Bodeguero Andaluz",
        "description": null
      },
      {
        "id": 353,
        "name": "Redbone Coonhound",
        "description": null
      },
      {
        "id": 354,
        "name": "Rhodesian Ridgeback",
        "description": null
      },
      {
        "id": 355,
        "name": "Rottweiler",
        "description": null
      },
      {
        "id": 356,
        "name": "Rough Collie",
        "description": null
      },
      {
        "id": 357,
        "name": "Russell Terrier",
        "description": null
      },
      {
        "id": 358,
        "name": "Russian Spaniel",
        "description": null
      },
      {
        "id": 359,
        "name": "Russian tracker",
        "description": null
      },
      {
        "id": 360,
        "name": "Russo-European Laika",
        "description": null
      },
      {
        "id": 361,
        "name": "Sabueso Español",
        "description": null
      },
      {
        "id": 362,
        "name": "Saint-Usuge Spaniel",
        "description": null
      },
      {
        "id": 363,
        "name": "Sakhalin Husky",
        "description": null
      },
      {
        "id": 364,
        "name": "Saluki",
        "description": null
      },
      {
        "id": 365,
        "name": "Samoyed",
        "description": null
      },
      {
        "id": 366,
        "name": "Sapsali",
        "description": null
      },
      {
        "id": 452,
        "name": "Šarplaninac",
        "description": null
      },
      {
        "id": 367,
        "name": "Schapendoes",
        "description": null
      },
      {
        "id": 368,
        "name": "Schillerstövare",
        "description": null
      },
      {
        "id": 369,
        "name": "Schipperke",
        "description": null
      },
      {
        "id": 370,
        "name": "Schweizer Laufhund",
        "description": null
      },
      {
        "id": 371,
        "name": "Schweizerischer Niederlaufhund",
        "description": null
      },
      {
        "id": 372,
        "name": "Scotch Collie",
        "description": null
      },
      {
        "id": 373,
        "name": "Scottish Deerhound",
        "description": null
      },
      {
        "id": 374,
        "name": "Scottish Terrier",
        "description": null
      },
      {
        "id": 375,
        "name": "Sealyham Terrier",
        "description": null
      },
      {
        "id": 376,
        "name": "Segugio Italiano",
        "description": null
      },
      {
        "id": 377,
        "name": "Seppala Siberian Sleddog",
        "description": null
      },
      {
        "id": 378,
        "name": "Serbian Hound",
        "description": null
      },
      {
        "id": 379,
        "name": "Serbian Tricolour Hound",
        "description": null
      },
      {
        "id": 380,
        "name": "Shar Pei",
        "description": null
      },
      {
        "id": 381,
        "name": "Shetland Sheepdog",
        "description": null
      },
      {
        "id": 382,
        "name": "Shiba Inu",
        "description": null
      },
      {
        "id": 383,
        "name": "Shih Tzu",
        "description": null
      },
      {
        "id": 384,
        "name": "Shikoku",
        "description": null
      },
      {
        "id": 385,
        "name": "Shiloh Shepherd Dog",
        "description": null
      },
      {
        "id": 386,
        "name": "Siberian Husky",
        "description": null
      },
      {
        "id": 387,
        "name": "Silken Windhound",
        "description": null
      },
      {
        "id": 388,
        "name": "Sinhala Hound",
        "description": null
      },
      {
        "id": 389,
        "name": "Skye Terrier",
        "description": null
      },
      {
        "id": 390,
        "name": "Sloughi",
        "description": null
      },
      {
        "id": 391,
        "name": "Slovak Cuvac",
        "description": null
      },
      {
        "id": 392,
        "name": "Slovakian Rough-haired Pointer",
        "description": null
      },
      {
        "id": 393,
        "name": "Small Greek Domestic Dog",
        "description": null
      },
      {
        "id": 394,
        "name": "Small Münsterländer",
        "description": null
      },
      {
        "id": 395,
        "name": "Smooth Collie",
        "description": null
      },
      {
        "id": 396,
        "name": "South Russian Ovcharka",
        "description": null
      },
      {
        "id": 397,
        "name": "Southern Hound",
        "description": null
      },
      {
        "id": 398,
        "name": "Spanish Mastiff",
        "description": null
      },
      {
        "id": 399,
        "name": "Spanish Water Dog",
        "description": null
      },
      {
        "id": 400,
        "name": "Spinone Italiano",
        "description": null
      },
      {
        "id": 401,
        "name": "Sporting Lucas Terrier",
        "description": null
      },
      {
        "id": 402,
        "name": "St. Bernard",
        "description": null
      },
      {
        "id": 403,
        "name": "St. John's water dog",
        "description": null
      },
      {
        "id": 404,
        "name": "Stabyhoun",
        "description": null
      },
      {
        "id": 405,
        "name": "Staffordshire Bull Terrier",
        "description": null
      },
      {
        "id": 406,
        "name": "Standard Schnauzer",
        "description": null
      },
      {
        "id": 407,
        "name": "Stephens Cur",
        "description": null
      },
      {
        "id": 408,
        "name": "Styrian Coarse-haired Hound",
        "description": null
      },
      {
        "id": 409,
        "name": "Sussex Spaniel",
        "description": null
      },
      {
        "id": 410,
        "name": "Swedish Lapphund",
        "description": null
      },
      {
        "id": 411,
        "name": "Swedish Vallhund",
        "description": null
      },
      {
        "id": 412,
        "name": "Tahltan Bear Dog",
        "description": null
      },
      {
        "id": 413,
        "name": "Taigan",
        "description": null
      },
      {
        "id": 414,
        "name": "Talbot",
        "description": null
      },
      {
        "id": 415,
        "name": "Tamaskan Dog",
        "description": null
      },
      {
        "id": 416,
        "name": "Teddy Roosevelt Terrier",
        "description": null
      },
      {
        "id": 417,
        "name": "Telomian",
        "description": null
      },
      {
        "id": 418,
        "name": "Tenterfield Terrier",
        "description": null
      },
      {
        "id": 419,
        "name": "Thai Bangkaew Dog",
        "description": null
      },
      {
        "id": 420,
        "name": "Thai Ridgeback",
        "description": null
      },
      {
        "id": 421,
        "name": "Tibetan Mastiff",
        "description": null
      },
      {
        "id": 422,
        "name": "Tibetan Spaniel",
        "description": null
      },
      {
        "id": 423,
        "name": "Tibetan Terrier",
        "description": null
      },
      {
        "id": 424,
        "name": "Tornjak",
        "description": null
      },
      {
        "id": 425,
        "name": "Tosa",
        "description": null
      },
      {
        "id": 426,
        "name": "Toy Bulldog",
        "description": null
      },
      {
        "id": 427,
        "name": "Toy Fox Terrier",
        "description": null
      },
      {
        "id": 428,
        "name": "Toy Manchester Terrier",
        "description": null
      },
      {
        "id": 429,
        "name": "Toy Trawler Spaniel",
        "description": null
      },
      {
        "id": 430,
        "name": "Transylvanian Hound",
        "description": null
      },
      {
        "id": 431,
        "name": "Treeing Cur",
        "description": null
      },
      {
        "id": 432,
        "name": "Treeing Walker Coonhound",
        "description": null
      },
      {
        "id": 433,
        "name": "Trigg Hound",
        "description": null
      },
      {
        "id": 434,
        "name": "Tweed Water Spaniel",
        "description": null
      },
      {
        "id": 435,
        "name": "Tyrolean Hound",
        "description": null
      },
      {
        "id": 436,
        "name": "Vizsla",
        "description": null
      },
      {
        "id": 437,
        "name": "Volpino Italiano",
        "description": null
      },
      {
        "id": 438,
        "name": "Weimaraner",
        "description": null
      },
      {
        "id": 439,
        "name": "Welsh Sheepdog",
        "description": null
      },
      {
        "id": 440,
        "name": "Welsh Springer Spaniel",
        "description": null
      },
      {
        "id": 441,
        "name": "Welsh Terrier",
        "description": null
      },
      {
        "id": 442,
        "name": "West Highland White Terrier",
        "description": null
      },
      {
        "id": 443,
        "name": "West Siberian Laika",
        "description": null
      },
      {
        "id": 444,
        "name": "Westphalian Dachsbracke",
        "description": null
      },
      {
        "id": 445,
        "name": "Wetterhoun",
        "description": null
      },
      {
        "id": 446,
        "name": "Whippet",
        "description": null
      },
      {
        "id": 447,
        "name": "White Shepherd",
        "description": null
      },
      {
        "id": 448,
        "name": "Wire Fox Terrier",
        "description": null
      },
      {
        "id": 449,
        "name": "Wirehaired Pointing Griffon",
        "description": null
      },
      {
        "id": 450,
        "name": "Wirehaired Vizsla",
        "description": null
      },
      {
        "id": 451,
        "name": "Yorkshire Terrier",
        "description": null
      },
      {
        "id": 452,
        "name": "Šarplaninac",
        "description": null
      },  
      {
        "id": 453,
        "name": "Unknown",
        "description": null
      }
    ];

    // methods
    service.get    = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find((g) => {
        return g.id == id
      });
    }

    function getAll() {
      return list;
    }

  }

})();