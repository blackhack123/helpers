#find file on path 
def find_file(dir_name, path)
  for root, dirs, files in os.walk(path):
      if dir_name.encode('utf-8') in files :
          absolute_dir = os.path.join(root, dir_name)
          return absolute_dir
 #example how use:
 # find_file('example.docx', '/home/Documents/')
 #output: /home/Documents/Example/example.docx
 
