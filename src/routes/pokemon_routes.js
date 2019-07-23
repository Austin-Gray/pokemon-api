"use strict";
exports.__esModule = true;
var pokemon_controller_1 = require("../controllers/pokemon_controller");
exports["default"] = (function (routes) {
    routes.collection('pokemon', function (pokemon) {
        pokemon.controller = new pokemon_controller_1["default"]();
        pokemon.index();
        pokemon.items('poke', function (poke) {
            poke.show();
        });
    });
});
//# sourceMappingURL=pokemon_routes.js.map