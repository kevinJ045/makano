import { Frame, Section, $ } from "../libs/gui.js";
import { name, age } from "../info.js";

var about = new Section('about', 'about');

about.html(`<h1 class="block-title">About Me</h1><div class="p-1">
	<div class="row m-3">
    <div class="col-sm-12 col-md-6">
        <div>
            <div class="photo-panel" style="text-align: center;">
                <img src="./img/me.jpg" style="display: block; width: 100%;border-radius: 25px;" class="img-responsive img-circle">
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-md-6">
        <div class="m-3">
            <h3>Me</h3>

            <p>Greetings! I'm ${name}, an ambitious ${age} years old Full Stack Developer with an insatiable love for JavaScript, Linux, and all things open source. My journey in the world of technology has been an exhilarating quest to harness the power of code and design to create meaningful and user-centric experiences.</p>
        	
        	<h3>Quick History</h3>


			<p>My passion for development began with JavaScript, the dynamic language that allows me to breathe life into web applications and craft interactive user interfaces. With a keen eye for aesthetics, I revel in the art of CSS, carefully sculpting each element to achieve the perfect balance between form and function.</p>

			<p>In my diverse arsenal of programming languages, I wield the versatility of Python, the robustness of Java, and the efficiency of C++. Whether it's building powerful backends or constructing intricate algorithms, I'm always eager to tackle new challenges and expand my coding prowess.</p>

			<p>Embracing the React framework has been an enlightening journey, enabling me to build scalable and responsive web applications that push the boundaries of user experience. My dedication to open source projects has also allowed me to contribute to the ever-evolving tech community and give back to the software that fuels my passion.</p>

			<p>On my development journey, I've found a kindred spirit in Linux, particularly Arch Linux, which I confidently navigate through the command-line interface. This proficiency in command-based activities allows me to fine-tune every aspect of my development environment, maximizing productivity and efficiency.</p>

			<p>This portfolio is a culmination of my efforts, showcasing the projects, applications, and experiments that have shaped my skills and knowledge. Each line of code represents not just a program but a piece of my heart and soul, dedicated to creating innovative solutions that leave a lasting impact.</p>

			<p>Join me as we embark on a voyage through the realms of code, design, and open source technology. Together, we'll pave the way for a brighter and more interconnected digital world.</p>

        </div>
    </div>
</div>
</div>`);

export default about;