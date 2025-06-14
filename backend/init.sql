-- Create database if not exists
CREATE DATABASE IF NOT EXISTS project_marinus_db;
USE project_marinus_db;

-- Create genres table
CREATE TABLE IF NOT EXISTS genres (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert default genres
INSERT IGNORE INTO genres (name) VALUES
('Fantasy'),
('Science Fiction'),
('Dark Academy');

-- Create author table
CREATE TABLE IF NOT EXISTS authors (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE
);

-- Insert default authors
INSERT IGNORE INTO authors (name) VALUES
('Victoria E.Schbaw'),
('Brandon Sanderson'),
('George R.R. Martin');

-- Create book table with foreign key to categories
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title varchar(255) NOT NULL,
  published_year year(4) DEFAULT NULL,
  number_of_pages int(10) UNSIGNED DEFAULT NULL,
  language varchar(50) NOT NULL,
  publisher varchar(100) DEFAULT NULL,
  synopsis text DEFAULT NULL,
  img_url text DEFAULT NULL,
  created_at datetime DEFAULT current_timestamp(),
  updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(), 
  author_id INT NOT NULL,
  CONSTRAINT fk_author
    FOREIGN KEY (author_id) REFERENCES authors(id)
      ON DELETE CASCADE
);

-- Insert default books
INSERT IGNORE INTO books (id, title, author_id, published_year, number_of_pages, language, publisher, synopsis, img_url, created_at, updated_at) VALUES
(1, 'Vicious', 1, '2013', 402, 'English', 'TOR', 'Victor and Eli started out as college roommates—brilliant, arrogant, lonely boys who recognized the same sharpness and ambition in each other. In their senior year, a shared research interest in adrenaline, near-death experiences, and seemingly supernatural events reveals an intriguing possibility: that under the right conditions, someone could develop extraordinary abilities. But when their thesis moves from the academic to the experimental, things go horribly wrong.\r\n\r\nTen years later, Victor breaks out of prison, determined to catch up to his old friend (now foe), aided by a young girl whose reserved nature obscures a stunning ability. Meanwhile, Eli is on a mission to eradicate every other super-powered person that he can find—aside from his sidekick, an enigmatic woman with an unbreakable will. Armed with terrible power on both sides, driven by the memory of betrayal and loss, the archnemeses have set a course for revenge—but who will be left alive at the end?\r\n\r\nIn Vicious, V. E. Schwab brings to life a gritty comic-book-style world in vivid prose: a world where gaining superpowers doesnt automatically lead to heroism, and a time when allegiances are called into question.', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1670752670i/40874032.jpg', '2025-05-13 21:51:01', '2025-05-13 21:51:01'),
(2, 'Vengeful', 1, '2018', 462, 'English', 'TOR', 'Magneto and Professor X. Superman and Lex Luthor. Victor Vale and Eli Ever. Sydney and Serena Clarke. Great partnerships, now soured on the vine.\r\n\r\nBut Marcella Riggins needs no one. Flush from her brush with death, she’s finally gained the control she’s always sought—and will use her new-found power to bring the city of Merit to its knees. She’ll do whatever it takes, collecting her own sidekicks, and leveraging the two most infamous EOs, Victor Vale and Eli Ever, against each other.\r\n\r\nWith Marcellas rise, new enmities create opportunity--and the stage of Merit City will once again be set for a final, terrible reckoning.', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1683488509i/26856502.jpg', '2025-05-13 21:53:13', '2025-05-13 21:53:13'),
(3, 'Mistborn: The Final Empire', 2, '2006', 541, 'English', 'Tor Books', 'For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler, the \"Sliver of Infinity,\" reigned with absolute power and ultimate terror, divinely invincible. Then, when hope was so long lost that not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the depths of the Lord Rulers most hellish prison. Kelsier \"snapped\" and found in himself the powers of a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper, with the Lord Ruler himself as the mark.\r\n\r\nKelsier recruited the underworlds elite, the smartest and most trustworthy allomancers, each of whom shares one of his many powers, and all of whom relish a high-stakes challenge. Then Kelsier reveals his ultimate dream, not just the greatest heist in history, but the downfall of the divine despot.\r\n\r\nBut even with the best criminal crew ever assembled, Kels plan looks more like the ultimate long shot, until luck brings a ragged girl named Vin into his life. Like him, shes a half-Skaa orphan, but shes lived a much harsher life. Vin has learned to expect betrayal from everyone she meets. She will have to learn trust if Kel is to help her master powers of which she never dreamed.\r\n\r\nBrandon Sanderson, fantasys newest master tale-spinner and author of the acclaimed debut Elantris, dares to turn a genre on its head by asking a simple question: What if the prophesied hero failed to defeat the Dark Lord? The answer will be found in the Mistborn Trilogy, a saga of surprises that begins with the book in your hands. Fantasy will never be the same again.', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1617768316i/68428.jpg', '2025-05-13 22:12:17', '2025-05-13 22:12:17'),
(4, 'Mistborn: The Well of Ascension', 2, '2007', 590, 'English', 'Tor Books', '\"Description contains spoilers for previous book in the series\"\r\n\r\nThe impossible has been accomplished. The Lord Ruler—the man who claimed to be god incarnate and brutally ruled the world for a thousand years—has been vanquished. But Kelsier, the hero who masterminded that triumph, is dead too, and now the awesome task of building a new world has been left to his young protégé, Vin, the former street urchin who is now the most powerful Mistborn in the land, and to the idealistic young nobleman she loves.\r\n\r\nAs Kelsiers protégé and slayer of the Lord Ruler she is now venerated by a budding new religion, a distinction that makes her intensely uncomfortable. Even more worrying, the mists have begun behaving strangely since the Lord Ruler died, and seem to harbor a strange vaporous entity that haunts her.\r\n\r\nStopping assassins may keep Vins Mistborn skills sharp, but its the least of her problems. Luthadel, the largest city of the former empire, doesnt run itself, and Vin and the other members of Kelsiers crew, who lead the revolution, must learn a whole new set of practical and political skills to help. It certainly wont get easier with three armies - one of them composed of ferocious giants - now vying to conquer the city, and no sign of the Lord Rulers hidden cache of atium, the rarest and most powerful allomantic metal.\r\n\r\nAs the siege of Luthadel tightens, an ancient legend seems to offer a glimmer of hope. But even if it really exists, no one knows where to find the Well of Ascension or what manner of power it bestows.', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1619538925i/68429.jpg', '2025-05-13 22:12:17', '2025-05-13 22:12:17'),
(5, 'Mistborn: The Hero of Ages', 2, '2008', 572, 'English', 'Tor Books', '\"Description contains spoilers for previous book in the series\"\r\n\r\nWho is the Hero of Ages?\r\n\r\nTo end the Final Empire and restore freedom, Vin killed the Lord Ruler. But as a result, the Deepness—the lethal form of the ubiquitous mists—is back, along with increasingly heavy ashfalls and ever more powerful earthquakes. Humanity appears to be doomed.\r\n\r\nHaving escaped death at the climax of The Well of Ascension only by becoming a Mistborn himself, Emperor Elend Venture hopes to find clues left behind by the Lord Ruler that will allow him to save the world. Vin is consumed with guilt at having been tricked into releasing the mystic force known as Ruin from the Well. Ruin wants to end the world, and its near omniscience and ability to warp reality make stopping it seem impossible. Vin cant even discuss it with Elend lest Ruin learn their plans!', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1628563911i/2767793.jpg', '2025-05-13 22:12:17', '2025-05-13 22:12:17'),
(6, 'A Game of Thrones', 3, '1996', 694, 'English', 'Bantam Books', 'Long ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister forces are massing beyond the kingdom’s protective Wall. To the south, the king’s powers are failing—his most trusted adviser dead under mysterious circumstances and his enemies emerging from the shadows of the throne. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the frozen land they were born to. Now Lord Eddard Stark is reluctantly summoned to serve as the king’s new Hand, an appointment that threatens to sunder not only his family but the kingdom itself.\r\n\r\nSweeping from a harsh land of cold to a summertime kingdom of epicurean plenty, A Game of Thrones tells a tale of lords and ladies, soldiers and sorcerers, assassins and bastards, who come together in a time of grim omens. Here an enigmatic band of warriors bear swords of no human metal; a tribe of fierce wildlings carry men off into madness; a cruel young dragon prince barters his sister to win back his throne; a child is lost in the twilight between life and death; and a determined woman undertakes a treacherous journey to protect all she holds dear. Amid plots and counter-plots, tragedy and betrayal, victory and terror, allies and enemies, the fate of the Starks hangs perilously in the balance, as each side endeavors to win that deadliest of conflicts: the game of thrones.', 'https://georgerrmartin.com/notablog/wp-content/uploads/2024/07/agameofthrones_2024_tr_repackage-1017x1536.jpg', '2025-05-13 22:18:54', '2025-05-13 22:18:54'),
(7, 'A Clash of Kings', 3, '1998', 768, 'English', 'Bantam Books', 'A comet the color of blood and flame cuts across the sky. Two great leaders—Lord Eddard Stark and Robert Baratheon—who hold sway over an age of enforced peace are dead, victims of royal treachery. Now, from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns. Six factions struggle for control of a divided land and the Iron Throne of the Seven Kingdoms, preparing to stake their claims through tempest, turmoil, and war.\r\n\r\nIt is a tale in which brother plots against brother and the dead rise to walk in the night. Here a princess masquerades as an orphan boy; a knight of the mind prepares a poison for a treacherous sorceress; and wild men descend from the Mountains of the Moon to ravage the countryside. Against a backdrop of incest and fratricide, alchemy and murder, victory may go to the men and women possessed of the coldest steel...and the coldest hearts. For when kings clash, the whole land trembles.\r\n\r\nHere is the second volume in George R.R. Martin magnificent cycle of novels that includes A Game of Thrones and A Storm of Swords. As a whole, this series comprises a genuine masterpiece of modern fantasy, bringing together the best the genre has to offer. Magic, mystery, intrigue, romance, and adventure fill these pages and transport us to a world unlike any we have ever experienced. Already hailed as a classic, George R.R. Martin stunning series is destined to stand as one of the great achievements of imaginative fiction.', 'https://georgerrmartin.com/notablog/wp-content/uploads/2024/07/aclashofkings_2024_tr_repackage-1017x1536.jpg', '2025-05-13 22:18:54', '2025-05-13 22:18:54'),
(8, 'A Storm of Swords', 3, '2000', 973, 'English', 'Bantam Books', 'Here is the third volume in George R.R. Martins magnificent cycle of novels that includes A Game of Thrones and A Clash of Kings. Together, this series comprises a genuine masterpiece of modern fantasy, destined to stand as one of the great achievements of imaginative fiction.\r\n\r\nOf the five contenders for power, one is dead, another in disfavor, and still the wars rage as alliances are made and broken. Joffrey sits on the Iron Throne, the uneasy ruler of the Seven Kingdoms. His most bitter rival, Lord Stannis, stands defeated and disgraced, victim of the sorceress who holds him in her thrall. Young Robb still rules the North from the fortress of Riverrun. Meanwhile, making her way across a blood-drenched continent is the exiled queen, Daenerys, mistress of the only three dragons still left in the world. And as opposing forces manoeuver for the final showdown, an army of barbaric wildlings arrives from the outermost limits of civilization, accompanied by a horde of mythical Others—a supernatural army of the living dead whose animated corpses are unstoppable. As the future of the land hangs in the balance, no one will rest until the Seven Kingdoms have exploded in a veritable storm of swords...', 'https://georgerrmartin.com/notablog/wp-content/uploads/2024/07/astormofswords_2024_tr_repackage-1017x1536.jpg', '2025-05-13 22:18:54', '2025-05-13 22:18:54'),
(9, 'A Feast for Crows', 3, '2005', 753, 'English', 'Bantam Books', 'Crows will fight over a dead mans flesh, and kill each other for his eyes.\r\n\r\nBloodthirsty, treacherous and cunning, the Lannisters are in power on the Iron Throne in the name of the boy-king Tommen. The war in the Seven Kingdoms has burned itself out, but in its bitter aftermath new conflicts spark to life.\r\n\r\nThe Martells of Dorne and the Starks of Winterfell seek vengeance for their dead. Euron Crows Eye, as black a pirate as ever raised a sail, returns from the smoking ruins of Valyria to claim the Iron Isles. From the icy north, where Others threaten the Wall, apprentice Maester Samwell Tarly brings a mysterious babe in arms to the Citadel.\r\n\r\nAgainst a backdrop of incest and fratricide, alchemy and murder, victory will go to the men and women possessed of the coldest steel and the coldest hearts.', 'https://georgerrmartin.com/notablog/wp-content/uploads/2024/07/afeastforcrows_2024_tr_repackage-1017x1536.jpg', '2025-05-13 22:18:54', '2025-05-13 22:18:54'),
(10, 'A Dance with Dragons', 3, '2011', 1016, 'English', 'Bantam Books', 'In the aftermath of a colossal battle, the future of the Seven Kingdoms hangs in the balance—beset by newly emerging threats from every direction. In the east, Daenerys Targaryen, the last scion of House Targaryen, rules with her three dragons as queen of a city built on dust and death. But Daenerys has thousands of enemies, and many have set out to find her. As they gather, one young man embarks upon his own quest for the queen, with an entirely different goal in mind.\r\n\r\nFleeing from Westeros with a price on his head, Tyrion Lannister, too, is making his way to Daenerys. But his newest allies in this quest are not the rag-tag band they seem, and at their heart lies one who could undo Daenerys’s claim to Westeros forever.\r\n\r\nMeanwhile, to the north lies the mammoth Wall of ice and stone—a structure only as strong as those guarding it. There, Jon Snow, 998th Lord Commander of the Night’s Watch, will face his greatest challenge. For he has powerful foes not only within the Watch but also beyond, in the land of the creatures of ice.\r\n\r\nFrom all corners, bitter conflicts reignite, intimate betrayals are perpetrated, and a grand cast of outlaws and priests, soldiers and skinchangers, nobles and slaves, will face seemingly insurmountable obstacles. Some will fail, others will grow in the strength of darkness. But in a time of rising restlessness, the tides of destiny and politics will lead inevitably to the greatest dance of all.', 'https://georgerrmartin.com/notablog/wp-content/uploads/2024/07/adancewithdragons_2024_tr_repackage-1017x1536.jpg', '2025-05-13 22:18:54', '2025-05-13 22:18:54');

-- Create book x genres table
CREATE TABLE IF NOT EXISTS book_genres (
	book_id INT NOT NULL,
	genre_id INT NOT NULL,
  PRIMARY KEY (book_id, genre_id),
  FOREIGN KEY (book_id) REFERENCES books(id)
    ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id)
    ON DELETE CASCADE
);

-- Insert default book-genre relations
INSERT IGNORE INTO book_genres (book_id, genre_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3),
(3, 3),
(4, 3),
(5, 3),
(6, 3),
(7, 3),
(8, 3),
(9, 3),
(10, 3);