import { Frame, Section, $ } from "../libs/gui.js";

var contactme = new Section('contact', 'contact');

contactme.html(`<div class="row m-5">
	<div class="col-sm-12 col-md-6">

	        <ul class="simple-ul">

	            <li><a href="https://t.me/bushyice" target="_blank"><i class="icon telegram"></i>Telegram: @bushyice</a></li>
	            <li><a href="https://instagram.com/bushyice" target="_blank"><i class="icon insta"></i>Instagram: @bushyice</a></li>
	            <li><a href="https://github.com/kevinj045" target="_blank"><i class="icon git"></i>Github: /kevinj045</a></li>
	            
	            <li><a href="https://makano.vercel.app" target="_blank"><i class="icon logo"></i>My Archive</a></li>
	            <li><a href="http://127.0.0.1" target="_blank">My IP: 127.0.0.1 :)</a></li>

	        </ul>

	</div>
	<div class="col-sm-12 col-md-6">

		<form>
		  <div class="mb-3 mt-3">
		    <label for="name" class="form-label">Name:</label>
		    <input type="text" class="form-control" id="name" placeholder="Let me know who u r" name="name">
		    <b f></b>
		  </div>
		  <div class="mb-3">
		    <label for="subject" class="form-label">Subject:</label>
		    <input type="text" class="form-control" id="subject" placeholder="What will we talk about?" name="subject">
		    <b f></b>
		  </div>
		  <div class="mb-3">
		    <label for="message">Message:</label>
			<textarea class="form-control" rows="5" id="message" name="message"></textarea>
			<b f></b>
		  </div>
		  <button type="submit" class="btn btn-primary">Submit</button>
		</form>

	</div>
</div>`)

export default contactme;