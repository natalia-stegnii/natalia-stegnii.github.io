<?php
/*
Template Name: main
Description: 
*/
?>
<?php get_header(); ?>
<main>
	<div class="top-img">
		<img src="/wp-content/themes/Appe/img/home_-corner_stripe_-blue-2
.png">
	</div>
	<div class="container">
		<div class="under-title flex z-index">
			<div class="line"></div>
			<div class="text text-white">WE ARE <bold>APPELL</bold></div>
		</div>
		<div class="title text-white z-index">
			<?php echo get_post_meta($post->ID, "title", $single = true); ?>
			<!-- We are the pavement maintenance specialists. -->
		</div>
		<div class="float-left flex">
			<div class="learn-more text-white button_link active"><a href="">learn more</a></div>
			<div class="get-a-qoute text-white button_link">
				<a href="">
					get a qoute
					<img src="/wp-content/themes/Appe/img/arrow-thin-right--white-4.png">
				</a>
			</div>
		</div>
		<div class="float-right flex arrow">
			<div class="text-white button_link"><a href=""><img src="/wp-content/themes/Appe/img/chevron-left--white-2.png"></a></div>
			<div class="text-white button_link">
				<a href=""><img src="/wp-content/themes/Appe/img/chevron-right--white-2.png"></a>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>
</main>
<section>
	<div class="container">
	<div class="section-block">
		<div class="under-title flex">
			<div class="line"></div>
			<div class="text text-black">OUR <bold class="text-blue">COMPLETE</bold> SOLUTION</div>
		</div>
		<div class="title text-black z-index">
			Professional<br> Service.<br>Personalized<br> Attention.
		</div>
		<div class="solution-img">
			<img src="/wp-content/themes/Appe/img/artboard_1_2x-1-web-3.png">
		</div>
		<div class="text-block">
			<p>Changing the pavement maintenance industry, one parking lot at a time.</p>
			<a href="">Learn more<img src="/wp-content/themes/Appe/img/arrow-thin-right--black-9.png"></a>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="section-block standards-block">
		<div class="under-title flex">
			<div class="line"></div>
			<div class="text text-black"><bold class="text-blue">INDIVIDUAL </bold> SERVICES </div>
		</div>
		<div class="title">
			Setting High<br> Standards
		</div>
		<div class="row standards text-black">
			<div class="col-lg-4 col-md-4">
				<div class="first-col">
					<div>
						<img src="/wp-content/themes/Appe/img/potholes-1.jpg">
					</div>
					<div class="col-title">
						<div class="title float-left">
							Pothole Repair
						</div>
						<div class="float-right">
							<a href=""><img src="/wp-content/themes/Appe/img/arrow-thin-right_-black-22.svg"></a>
						</div>
					</div>
					<div class="clearfix"></div>
					<p><?php echo get_post_meta($post->ID, "pothole-repair", $single = true); ?>
					<!-- Whether you’re in need of a permanent or interim solution, our range of pothole repair services are designed to meet any budget. --></p>
				</div>
			</div>
			<div class="col-lg-4 col-md-4">
				<div class="second-col">
					<div>
						<img src="/wp-content/themes/Appe/img/seal-coating-2-1.jpg">
					</div>
					<div class="col-title">
						<div class="title float-left">
							Seal Coating
						</div>
						<div class="float-right">
							<a href=""><img src="/wp-content/themes/Appe/img/arrow-thin-right_-black-22.svg"></a>
						</div>
					</div>
					<div class="clearfix"></div>
					<p>
						<?php echo get_post_meta($post->ID, "seal-coating", $single = true); ?>
					<!-- Maintain the long-term beauty and structure of your parking lot by investing in protective sealcoating to guard against destructive natural elements. --></p>
				</div>
			</div>
			<div class="col-lg-4 col-md-4">
				<div class="third-col">
					<div>
						<img src="/wp-content/themes/Appe/img/stripping_small.jpg">
					</div>
					<div class="col-title">
						<div class="title float-left">
							Striping
						</div>
						<div class="float-right">
							<a href=""><img src="/wp-content/themes/Appe/img/arrow-thin-right_-black-22.svg"></a>
						</div>
					</div>
					<div class="clearfix"></div>
					<p>
						<?php echo get_post_meta($post->ID, "striping", $single = true); ?>
					<!-- Maximize your parking lot’s space and aesthetics with clean, professional line striping designed to suit your property’s individual requirements. --></p>
				</div>
			</div>
		</div>
	</div>
	</div>
</section>
<script>
function myFunction(x) {
    x.classList.toggle("change");
}
</script>
</body>
</html>