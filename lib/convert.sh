FILES=*.docx
for f in $FILES
do
  # extension="${f##*.}"
  filename="${f%.*}"
  echo "Converting $f to $filename.md"
  `pandoc $f -t markdown -o ./src/lib/$filename.md --extract-media=src/`
  # uncomment this line to delete the source file.
  # rm $f
done