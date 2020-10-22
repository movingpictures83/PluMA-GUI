import sys
import detail

detail_fullpath = sys.argv[1]
detail_name = sys.argv[2]

#det = detail.open(str(detail_fullpath))

detail_save_path = detail_fullpath.replace(detail_name, "results.csv")

print("/detail/results.csv")


