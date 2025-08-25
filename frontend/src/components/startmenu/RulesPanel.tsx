export default function RulesPanel() {
  return (
    <div className="mt-8 flex flex-col gap-2 h-full w-full text-sm">
      <h2 className="subheader mx-auto">Spielregeln</h2>
      <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: "Idee",
            content: (
              <p>
                <strong>Politische Aussagen</strong> den richtigen Parteien
                zuordnen – schnell, strategisch und mit Teamgeist. Jede richtige
                Antwort bringt Punkte, jeder Fehler kostet Leben. Das Spiel soll
                Politik auf spielerische Weise erlebbar machen.
                <br />
                <strong>Das Ziel:</strong> möglichst viele Punkte sammeln,
                Highscore knacken und politische Inhalte besser verstehen.
              </p>
            ),
          },
          {
            title: "Punkte",
            content: (
              <ul className="space-y-1">
                <li>
                  <strong>Basis:</strong> 1000 Punkte (mit Power-Ups -15%, ohne
                  +15%)
                </li>
                <li>
                  <strong>Zeitbonus:</strong> +100 Punkte pro Sekunde Restzeit
                </li>
                <li>
                  <strong>Schwierigkeitsgrad:</strong> mehr Punkte bei höherem
                  Level
                </li>
                <li>
                  <strong>Power-Ups:</strong> ohne +15% und mit -15%
                </li>
                <li>
                  <strong>Zufallseffekt:</strong> 2% Chance auf doppelte Punkte
                </li>
              </ul>
            ),
          },
          {
            title: "Runde",
            content: (
              <ul className="space-y-1">
                <li>
                  <strong>Aufbau: </strong>1 Aussage, 4 Felder
                </li>
                <li>
                  <strong>Zeit pro Aussage: </strong>30s Timer · Rassel bei 15s
                </li>
                <li>
                  <strong>Power-Ups:</strong> Fifty-Fifty, Doppelte Punkte, Zeit
                  +10s, Zusatzinfos
                </li>
                <li>
                  <strong>Rundenlänge: </strong>3 Leben (Bonus nach 5er Streak)
                </li>
              </ul>
            ),
          },
          {
            title: "Besondere Effekte",
            content: (
              <>
                <ul className="space-y-1">
                  <li>
                    <strong>Saving Grace (1%): </strong> Überlebe Verlust
                    letzten Lebens
                  </li>
                  <li>
                    <strong>Doppelte Punkte (2%): </strong> Diese Runde gibt
                    doppelt so viel!
                  </li>
                  <li>
                    <strong>Verdeckte Antwort (5%): </strong>Blockt eine falsche
                    Möglichkeit{" "}
                  </li>
                </ul>
                <p className="mt-2">
                  <a
                    href="#"
                    className="text-blue-800 underline hover:text-blue-300"
                  >
                    Quellenübersicht anzeigen
                  </a>
                </p>
              </>
            ),
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border-2 border-gray-800 shadow text-sm"
          >
            <h2 className="subsubheader mb-2">{card.title}</h2>
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
}
