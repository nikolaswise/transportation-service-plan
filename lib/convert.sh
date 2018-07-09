echo 'Starting'
jandoc -d lib/01_Introduction.docx -r docx -o src/lib -t markdown --wrap=none  --extract-media=src/img
jandoc -d lib/02_Goals-and-Policies-Transportation.docx -r docx -o src/lib -t markdown --wrap=none  --extract-media=src/img
jandoc -d lib/03_Street-Classification-Descriptions.docx -r docx -o src/lib -t markdown --wrap=none  --extract-media=src/img
jandoc -d lib/04_Master-Street-Plans.docx -r docx -o src/lib -t markdown --wrap=none  --extract-media=src/img
jandoc -d lib/05_Modal-Plans.docx -r docx -o src/lib -t markdown --wrap=none  --extract-media=src/img
jandoc -d lib/06_Implementation-Strategies.docx -r docx -o src/lib -t markdown --wrap=none  --extract-media=src/img
jandoc -d lib/07_Glossary.docx -r docx -o src/lib -t markdown --wrap=none  --extract-media=src/img
echo 'Done'