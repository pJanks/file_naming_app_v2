# File Naming App

Node.js must be installed to run this app.

This app can be used to select one or more files from a file explorer, or drag and drop one or multiple files, and prepend them with a descriptor. It will also create a folder to store the groups in. **This utility will NOT edit the original files**. I recommend checking to make sure the new files are not corrupted before erasing original files.

After filling out the form and selecting the files you want to group, simply click `Submit`. Navigate to the `uploads/` directory created in the root of this project and verify that all of your files are there and that they are not corrupted.

# *Updated Jan 2023*

This utility now offers an option to enter a starting position and ending position of characters to remove from the original filename. It is important to note that these are **NOT ZERO-BASED INDEXES**; The first character in the filename is located at position 1. The inputs default values are 0, which will leave the string as is.

## ***Examples of Behavior:***

Given `robot_yellow.png` as the original filename and starting/ending position inputs in the format (startPosition, endPosition), the following demonstrate how the filename will be changed. The ultimate result of the below inputs would be files found in: `/uploads/[userInputtedDirectory]/[userInputToPrepend]_` followed immediately by the return values below.

The default values will return the original name:

  - (0, 0) returns `robot_yellow.png`

Valid syntax returns a new name with the characters removed between the startPosition and endPosition (inclusively):

  - (1, 1) returns `obot_yellow.png`
  - (3, 5) returns `ro_yellow.png`

0 is not valid in starting or ending positions. This will return the original name:

  - (5, 0) returns `robot_yellow.png`
  - (0, 2) returns `robot_yellow.png`

Negative numbers are not valid in starting or ending positions. This will return the original name:

  - (-2, -1) returns `robot_yellow.png`

It is not valid to have the ending position less than the starting position. This will return the original name:

  - (5, 3) returns `robot_yellow.png`

It is not valid to remove all characters. This will return the original name:

  - (1, 16) returns `robot_yellow.png`

If the ending position extends into the file extension the file extension will be appended to the name ***which may have unexpected results:***

  - (7, 14) returns `robot_ng.png`

## Getting Started

  - clone this repository
  - `cd` into project directory
  - run `npm install`
  - run `node server.js`
  - go to `127.0.0.1:3001` in your web browser

## Alternitavely

  - clone down this repository
  - navigate to the project in your file explorer
  - double-click the `start.bat` file ***(this will only work on Windows)***

Kill the node service with `ctrl + c` when you are finished using the utility.