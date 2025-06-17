document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("pokemonModal");
    const modalContent = document.getElementById("modalPokemonCard");

    function showPokemonInModal(pokemon) {   
        modalContent.innerHTML = `
            <div class="pokemon-modal ${pokemon.type}">
                <div class="header-info">
                    <div class="name-types">
                        <span class="close-button">&times;</span>
                        <h2 class="name">${pokemon.name}</h2>
                        <ol class="types">
                            ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </div>
                    <span class="number">#${pokemon.number}</span>
                </div>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                <div class="modal-bottom">
                    <div class="info">
                        <p><strong>Altura:</strong> ${pokemon.height.toFixed(1)} m</p>
                        <p><strong>Peso:</strong> ${pokemon.weight.toFixed(1)} kg</p>
                        <p><strong>Habilidades:</strong>${pokemon.abilities.map(a => `<span class="ability">${a}</span>`).join(', ')}</p>
                    </div>
                </div>
            </div>
        `;
        const closeButton = document.querySelector(".close-button");

        closeButton.addEventListener("click", () => {
            modal.classList.remove("show");
        });

        modal.classList.add("show");
    }

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