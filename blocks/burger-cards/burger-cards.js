import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'burger-cards-card-image';
      else div.className = 'burger-cards-card-body';
    });
    ul.append(li);

    // burger card special layout
    const leftFirstElement = li.children[0];
    const rightFirstElement = li.children[1];
    const rightSecondElement = li.children[2];
    const leftSection = document.createElement('div');
    leftSection.className = 'burger-cards-left-section';
    li.append(leftSection);

    const rightSection = document.createElement('div');
    rightSection.className = 'burger-cards-right-section';
    li.append(rightSection);

    // add blank p element when no of children < 4
    if (rightSecondElement.children.length === 3) {
      const blankPElement = document.createElement('p');
      blankPElement.textContent = '`';
      blankPElement.style.opacity = '0';
      rightSecondElement.insertBefore(blankPElement, rightSecondElement.children[1]);
    }

    leftSection.append(leftFirstElement);
    rightSection.append(rightFirstElement);
    rightSection.append(rightSecondElement);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
