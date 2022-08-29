<h1><?=$author[0]['name']?></h1>
<p><?=$author[0]['description']?></p>
<h2>Книги автора</h2>
<ul>
  <?php foreach($books as $book) { ?>
    <li>
      <a href="book.php?id=<?=$book['id']?>"><?=$book['title']?></a>
    </li>
  <?php } ?>
</ul>