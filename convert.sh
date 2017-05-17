FILES=*.docx
for f in lib/$FILES
do
  # extension="${f##*.}"
  filename="${f%.*}"
  echo "Converting $f to $filename.md"
  `pandoc $f -f docx -t markdown -o ./src/$filename.md --extract-media=.`
  # uncomment this line to delete the source file.
  # rm $f
done