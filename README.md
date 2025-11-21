# Live demo:
https://jnggerg.github.io/terkepesz/

# Játékleírás:
Ebben az egyszemélyes játékban egy 11x11-es négyzetrácsos térképre kell lehelyezni különböző alakzatú, különböző
tereptípusú térképelemeket. Minden elemhez tartozik egy időérték (1 vagy 2). A játék
végén (vagy közben) a négyzetrács aktuális állapota alapján kell pár ellenőrzést (küldetést) elvégezni, és ez alapján
alakul ki a végső pontszám.
## A játék időtartama
A játék 28 időegységig tart. Minden térképelemhez tartozik egy időegység, ami meghatározza, hogy mennyi ideig tart
őket felfedezni. Addig tudunk új térképelemeket húzni, amíg el nem érjük a 28 időegységet. Ha az összesített időérték
eléri, vagy meghaladja a 28 időegységet, a játék véget ér. Például, ha 1 időegységünk maradt hátra, és egy két
időegységgel rendelkező térképelemet kapunk, a térképelemet még lehelyezhetjük, és utána a játék véget ér.
## Évszakok
A 28 időegység egy évet jelképez. Ez felbontható 4 évszakra, mindegyik évszak 7 időgységig tart. Ha a térképelemek
húzása közben az összesített időérték eléri, vagy meghaladja a 7 többszörösét, az évszak véget ér.
Minden évszak végén 2 küldetéskártyáért tudunk pontszámot kapni. A tavasz végén az A-B küldetésért, a nyár végén
a B-C küldetésért, az ősz végén a C-D küldetésért, a tél végén pedig a D-A küldetésért tudunk pontokat szerezni.
