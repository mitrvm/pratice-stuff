import "./styles.css";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export const title = "Wordle";

export default function WordlePage() {
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [userAns, setUserAns] = useState("");
  const [submittedAns, setSubmittedAns] = useState<string[]>([]);
  const [inputBlocked, setInputBlocked] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<"daily" | "endless">("daily");

  const inputRef = useRef<HTMLInputElement>(null);

  const regex = /^[A-Za-z]{5}$/;

  const submit = () => {
    if (userAns.length === 5 && regex.test(userAns)) {
      setSubmittedAns((prev) => [...prev, userAns]);
      setUserAns("");
      if (userAns.toLowerCase() === selectedWord.toLowerCase()) {
        toast.success(
          `correct. the answer was ${selectedWord.charAt(0).toUpperCase() + selectedWord.slice(1)}.`,
        );
        setInputBlocked(true);
        setUserAns("");
        setTimeout(() => {
          setSubmittedAns([]);
          fetchWord();
          setInputBlocked(false);
        }, 2000);
      }
    } else if (!regex.test(userAns) && userAns.length === 5)
      toast.error("not a real word, chum");
    else toast.error("needs to be 5 letters");

    inputRef.current?.focus;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !inputBlocked) {
      event.preventDefault();
      submit();
    }
  };
  const url = "https://darkermango.github.io/5-Letter-words/words.txt";

  const fetchWord = () => {
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
        if (gameMode === "daily") setSelectedWord(getDailyWord(words));
        else {
          const randIndex = Math.floor(Math.random() * words.length);
          const word = words[randIndex];
          setSelectedWord(word);
          console.log(word);
        }
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };

  const getDailyWord = (words: string[]) => {
    const startDate = new Date("2026-09-23");
    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const daysPassed = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    console.log(words[daysPassed % words.length]);
    return words[daysPassed % words.length];
  };

  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    setSubmittedAns([]);
    setUserAns("");
    setInputBlocked(false);
    fetchWord();
    inputRef.current?.focus();
  }, [gameMode]);

  const currentLetter = (index: number) => {
    return submittedAns.join("").split("")[index];
  };

  const selectColor = (index: number) => {
    let row = Math.floor(index / 5);
    let column = index % 5;
    const submittedWord = submittedAns[row];
    const selectedWordLetters = selectedWord.split("");

    if (!submittedWord || !selectedWord) return "";

    if (selectedWord[column] === submittedWord[column]) return " green";

    for (let i = 0; i < 5; i++) {
      if (submittedWord[i] === selectedWord[i]) selectedWordLetters[i] = "";
    }

    for (let i = 0; i < column; i++) {
      if (
        submittedWord[i] !== selectedWord[i] &&
        selectedWordLetters.includes(submittedWord[i])
      ) {
        const letterIndex = selectedWordLetters.indexOf(submittedWord[i]);
        selectedWordLetters[letterIndex] = "";
      }
    }
    if (selectedWordLetters.includes(submittedWord[column])) return " yellow";

    return "";
  };

  return (
    <div className="content">
      <div className="header">
        Wordle
        <div className="type-select">
          <button
            className={gameMode === "daily" ? "active" : ""}
            onClick={() => setGameMode("daily")}
          >
            Daily
          </button>
          <button
            className={gameMode === "endless" ? "active" : ""}
            onClick={() => setGameMode("endless")}
          >
            Endless
          </button>
        </div>
      </div>
      <div className="answer">
        <input
          value={userAns}
          maxLength={5}
          type="text"
          onKeyDown={handleKeyDown}
          autoFocus
          ref={inputRef}
          disabled={inputBlocked}
          onChange={(e) => {
            setUserAns(e.target.value);
          }}
        ></input>
        <button onClick={() => submit()} disabled={inputBlocked}>
          Submit
        </button>
      </div>
      <div className="answers-grid">
        {Array.from({ length: 25 }, (_, index) => (
          <div key={index} className={`letter-block${selectColor(index)}`}>
            {currentLetter(index) ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
