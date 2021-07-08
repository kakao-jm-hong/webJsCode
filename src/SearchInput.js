const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onClick }) {
    const box = document.createElement('div');
    box.className = 'box';

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    // [D] autofocus 추가
    this.$searchInput.setAttribute('autofocus','autofocus');

    $searchInput.className = "SearchInput";

    this.$randomButton = document.createElement('button');
    this.$randomButton.className ='button';
    this.$randomButton.innerHTML = 'Random 50';

    box.appendChild(this.$searchInput);
    box.appendChild(this.$randomButton);
    $target.appendChild(box);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    this.$randomButton.addEventListener("click", () => {
      onClick();
    });
 
  }
  render() {}
}
