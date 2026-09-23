import "./styles.css";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const title = "Wordle";

// TODO later add daily/endless mode

export default function WordlePage() {
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [userAns, setUserAns] = useState("");
  const [submittedAns, setSubmittedAns] = useState<string[]>([]);

  const regex = /^[A-Za-z]{5}$/;

  const submit = () => {
    if (userAns.length === 5 && regex.test(userAns)) {
      setSubmittedAns((prev) => [...prev, userAns]);
      setUserAns("");
      if (userAns.toLowerCase() === selectedWord.toLowerCase()) {
        toast.success("wat");
      }
    } else if (!regex.test(userAns) && userAns.length === 5)
      toast.error("not a real word, chum");
    else toast.error("needs to be 5 letters");

    return;
  };

  const url = "https://darkermango.github.io/5-Letter-words/words.txt";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error("Status Code: " + response.statusText);
        return response.text();
      })
      .then((data) => {
        const words = data
          .split("\n")
          .map((word) => word.trim())
          .filter(Boolean);
        const randIndex = Math.floor(Math.random() * words.length);
        const word = words[randIndex];
        setSelectedWord(word);
        console.log(word);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, []);

  return (
    <div className="content">
      Wordle
      <div className="answer">
        <input
          value={userAns}
          maxLength={5}
          type="text"
          onChange={(e) => {
            setUserAns(e.target.value);
          }}
        ></input>
        <button onClick={() => submit()}>Submit</button>
      </div>
      <div className="answers-grid">
        {Array.from({ length: 25 }, (_, index) => (
          <div key={index} className="letter-block">
            {submittedAns.join("").split("")[index] ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
