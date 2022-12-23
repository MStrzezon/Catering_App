import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Dish} from "../../models/Dish";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const dishes = [
        {
          "name": "Pizza prosciutto",
          "cuisine_type": "włoska",
          "dish_type": "danie główne",
          "ingredients": [
            "sos pomidorowy",
            "mozarella",
            "szynka"
          ],
          "amount": 8,
          "price": 6.00,
          "description": "Pyszna pizza z włoskimi dodatkami. Szynka parmeńska, pomidorki koktajlowe, świeża rukola i starty parmezan to idealny wybór. Pizza dla osób ceniących sobie dobrą włoską kuchnię. Gotowa pizza podana w towarzystwie oliwy z oliwek będzie idealnym dopełnieniem romantycznej kolacji.",
          "image": "https://2.bp.blogspot.com/-60_KIOCYBT0/Ve4EvTOmOEI/AAAAAAAAEOc/AMcolUbJihA/s1600/pizza%2Bna%2Blato.DSC_0668.jpg"
        },
        {
          "name": "Pizza margherita",
          "cuisine_type": "włoska",
          "dish_type": "pizza",
          "ingredients": [
            "sos pomidorowy",
            "mozarella"
          ],
          "amount": 3,
          "price": 4.00,
          "description": "Pizza z sosem pomidorowym i tartym serem mozzarella.",
          "image": "https://images.pexels.com/photos/6940997/pexels-photo-6940997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          "name": "Spaghetti bolognese",
          "cuisine_type": "włoska",
          "dish_type": "pizza",
          "ingredients": [
            "makaron spaghetti",
            "wołowina",
            "parmezan"
          ],
          "amount": 5,
          "price": 4.50,
          "description": "Prawdziwy klasyk kuchni włoskiej",
          "image": "https://images.pexels.com/photos/4349774/pexels-photo-4349774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          "name": "Żurek",
          "cuisine_type": "polska",
          "dish_type": "zupa",
          "ingredients": [
            "kiełbasa",
            "jajko"
          ],
          "amount": 7,
          "price": 1,
          "description": "Zurek z białą kiełbasą i jajkiem",
          "image": "https://images.pexels.com/photos/1707270/pexels-photo-1707270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          "name": "Rosół",
          "cuisine_type": "polska",
          "dish_type": "zupa",
          "ingredients": [
            "makaron",
            "marchew",
            "pietruszka"
          ],
          "amount": 11,
          "price": 1,
          "description": "Rosół z kury podawany z makaronem",
          "image": "https://images.pexels.com/photos/4210858/pexels-photo-4210858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          "name": "Frytki",
          "cuisine_type": "międzynarodowa",
          "dish_type": "dodatek",
          "ingredients": [
            "frytki"
          ],
          "amount": 21,
          "price": 2,
          "description": "Frytki smażone na oleju",
          "image": "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          "name": "Kotlet schabowy",
          "cuisine_type": "polska",
          "dish_type": "danie główne",
          "ingredients": [
            "ziemniaki gotowane",
            "kapusta zasmażana"
          ],
          "amount": 9,
          "price": 5.50,
          "description": "Kotlet schabowy z ziemniaczkami i pyszną kapustą",
          "image": "https://images.pexels.com/photos/4210802/pexels-photo-4210802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          "name": "Sałatka z kaczką",
          "cuisine_type": "francuska",
          "dish_type": "sałatka",
          "ingredients": [
            "sos śliwkowy"
          ],
          "amount": 11,
          "price": 5.00,
          "description": "Sałatka z wędzoną kaczką, dressingiem i orzechami",
          "image": "https://i2.wp.com/fitfoodstories.com/wp-content/uploads/2019/12/DSC_3641.jpg"
        },
        {
          "name": "Kluski śląskie",
          "cuisine_type": "polska",
          "dish_type": "dodatek",
          "ingredients": [],
          "amount": 4,
          "price": 3.00,
          "description": "Kluski śląskie, które świetnie się komponują z daniami polskimi",
          "image": "https://images.pexels.com/photos/4202387/pexels-photo-4202387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          "name": "Wegańskie curry",
          "cuisine_type": "indyjska",
          "dish_type": "wegański",
          "ingredients": [
            "cukinia",
            "soczewica czerwona"
          ],
          "amount": 5,
          "price": 5.00,
          "description": "Wegańskie rozgrzewające curry pełne warzyw",
          "image": "https://e-przepisykulinarne.pl/wp-content/uploads/2014/09/curry_wege.jpg"
        },
        {
          "name": "Sałatka francuska",
          "cuisine_type": "francuska",
          "dish_type": "sałatka",
          "ingredients": [
            "sałata",
            "granat",
            "cebula"
          ],
          "amount": 5,
          "price": 2.00,
          "description": "Sałatka z granatem",
          "image": "https://images.pexels.com/photos/806361/pexels-photo-806361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          "name": "Krewetki",
          "cuisine_type": "francuska",
          "dish_type": "przystawka",
          "ingredients": [
            "krewetki",
            "białe wino",
            "szpinak"
          ],
          "amount": 10,
          "price": 3.00,
          "description": "Krewetki w sosie z białego wina",
          "image": "https://nietylkopasta.pl/wp-content/uploads/2012/02/krewetkiwsmietanie2.jpg"
        }
      ];
    const cart = [
      {
        "name": "Pizza prosciutto",
        "cuisine_type": "włoska",
        "dish_type": "danie główne",
        "ingredients": [
          "sos pomidorowy",
          "mozarella",
          "szynka"
        ],
        "amount": 8,
        "price": 6.00,
        "description": "Pyszna pizza z włoskimi dodatkami. Szynka parmeńska, pomidorki koktajlowe, świeża rukola i starty parmezan to idealny wybór. Pizza dla osób ceniących sobie dobrą włoską kuchnię. Gotowa pizza podana w towarzystwie oliwy z oliwek będzie idealnym dopełnieniem romantycznej kolacji.",
        "image": "https://2.bp.blogspot.com/-60_KIOCYBT0/Ve4EvTOmOEI/AAAAAAAAEOc/AMcolUbJihA/s1600/pizza%2Bna%2Blato.DSC_0668.jpg"
      },
      {
        "name": "Frytki",
        "cuisine_type": "międzynarodowa",
        "dish_type": "dodatek",
        "ingredients": [
          "frytki"
        ],
        "amount": 21,
        "price": 2,
        "description": "Frytki smażone na oleju",
        "image": "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        "name": "Kotlet schabowy",
        "cuisine_type": "polska",
        "dish_type": "danie główne",
        "ingredients": [
          "ziemniaki gotowane",
          "kapusta zasmażana"
        ],
        "amount": 9,
        "price": 5.50,
        "description": "Kotlet schabowy z ziemniaczkami i pyszną kapustą",
        "image": "https://images.pexels.com/photos/4210802/pexels-photo-4210802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ];
    return {dishes, cart};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(dishes: Dish[]): number {
    return dishes.length > 0 ? Math.max(...dishes.map(dish => dish.id)) + 1 : 11;
  }
}
