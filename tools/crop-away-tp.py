from PIL import Image
import os


def crop_transparent_background(input_folder, output_folder):
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Loop through all files in the input folder
    for filename in os.listdir(input_folder):
        # Check if the file is an image
        if filename.endswith((".png", ".jpg", ".jpeg", ".gif", ".bmp", "webp")):
            # Open the image
            image_path = os.path.join(input_folder, filename)
            img = Image.open(image_path)

            # Crop away any border that is completely transparent
            img_data = img.getdata()
            bg_color = img_data[0]
            non_bg_pixels = [pixel for pixel in img_data if pixel != bg_color]
            bbox = img.getbbox()

            # Crop the image
            cropped_img = img.crop(bbox)

            # Save the cropped image
            output_path = os.path.join(output_folder, filename)
            cropped_img.save(output_path)

            print(f"{filename} cropped and saved.")


# Specify input and output folders
input_folder = "res/static/partners"
output_folder = "res/static/partners/src"

# Call the function
crop_transparent_background(input_folder, output_folder)
