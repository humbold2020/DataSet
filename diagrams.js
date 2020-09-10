const smplBellCurve = (x, s, printDiagram = false) => {
    let firstDevMinus = x - s;
    let firstDevPlus = x + s;
    let secondDevMinus = x - (2 * s);
    let secondDevPlus = (2 * s) + x;
    let thirdDevMinus =x - (3 * s);
    let thirdDevPlus = (3 * s) + x; 
    firstDevMinus = parseFloat(firstDevMinus.toFixed(2));
    firstDevPlus = parseFloat(firstDevPlus.toFixed(2));
    secondDevMinus = parseFloat(secondDevMinus.toFixed(2));
    secondDevPlus = parseFloat(secondDevPlus.toFixed(2));
    thirdDevMinus = parseFloat(thirdDevMinus.toFixed(2));
    thirdDevPlus = parseFloat(thirdDevPlus.toFixed(2));
    if (printDiagram === true) {
    console.log(['\n',
    ['                                                       .                                   '], '\n',
    ['                                                   .   |   .                               '], '\n',
    [`                                x - s :  ${firstDevMinus}    .     |     .  x + s : ${firstDevPlus}                      `], '\n',
    ['                                                .      |      .                            '], '\n',
    ['                                               .       |       .                           '], '\n',
    ['                                              .        |        .                          '], '\n',
    ['                                             .         |         .                         '], '\n',
    ['                                            .          |          .                        '], '\n',
    ['                                           .           |           .                         '], '\n',
    [`                         x - 2s : ${secondDevMinus}    .            |             .  x + 2s : ${secondDevPlus}             `], '\n',
    ['                                       .               |                .                  '], '\n',
    ['                                   .                   |                    .              '], '\n',
    [`            x - 3s : ${thirdDevMinus}    .                         |                           . x + 3s : ${thirdDevPlus}`], '\n'])
    } else {
    variables = [firstDevMinus, firstDevPlus , secondDevMinus, secondDevPlus, thirdDevMinus, thirdDevPlus];
    return variables;
    }
}

    module.exports = smplBellCurve;
