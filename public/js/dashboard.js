const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#book-title').value.trim();
    const author = document.querySelector('#book-author').value.trim();
    const rating = document.querySelector('#book-rating').value.trim();
  
    if (title && author) {
      const response = await fetch(`/api/books`, {
        method: 'POST',
        body: JSON.stringify({ title, author }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

    //   Add rating prompt
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create book');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete book');
      }
    }
  };
  
  document
    .querySelector('.new-book-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.book-list')
    .addEventListener('click', delButtonHandler);
  