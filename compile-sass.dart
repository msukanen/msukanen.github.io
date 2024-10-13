import 'dart:io';
import 'package:sass/sass.dart' as sass;

void main(List<String> args) {
    var result = sass.compile(args[0]);
    new File(args[1]).writeAsStringSync(result);
}

/*
This script takes two arguments: the input file and the output file. It reads the input file, compiles it, and writes the result to the output file.
To run the script, you need to have the **sass** package installed. You can install it using **pub**:
```
    dart get pub
    pub global activate sass
```

Then you can run the script:
```
    dart compile-sass.dart input.scss output.css
```
This will compile the `input.scss` file and write the result to `output.css`.
*/
