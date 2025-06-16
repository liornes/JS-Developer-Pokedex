document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("pokemonModal");
    const modalContent = document.getElementById("modalPokemonCard");
    const closeButton = document.querySelector(".close-button");

    function showPokemonInModal(pokemon) {
        modalContent.innerHTML = `
            <div class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <h2 class="name">${pokemon.name}</h2>
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        `;

        modal.classList.add("show");
    }

    closeButton.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

    function addPokemonClickEvents() {
        const pokemonItems = document.querySelectorAll("#pokemonList li");

        pokemonItems.forEach(li => {
            li.addEventListener("click", () => {
                const pokemonName = li.querySelector(".name").textContent;

                PokeApi.getPokemon(pokemonName)
                    .then((pokemonDetail) => {
                        const pokemon = convertPokemonDetailToPokemon(pokemonDetail);
                        showPokemonInModal(pokemon);
                    })
            });
        });
    }

    const observer = new MutationObserver(addPokemonClickEvents);
    observer.observe(document.getElementById("pokemonList"), { childList: true });
    
    addPokemonClickEvents();
});