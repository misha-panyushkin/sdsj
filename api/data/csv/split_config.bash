tail -n +2 all.csv | split -l 65000 - split_
for file in split_*
do
    head -n 1 all.csv > tmp_file
    cat $file >> tmp_file
    mv -f tmp_file $file
done