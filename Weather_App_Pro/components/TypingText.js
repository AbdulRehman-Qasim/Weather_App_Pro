import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

export default function TypingText({ text, speed = 170, style = { fontSize: 24, color: 'black', fontWeight: '700' } }) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDeleting) {
        // Typing phase
        setDisplayedText(text.substring(0, index + 1));
        setIndex((prev) => prev + 1);
        if (index + 1 === text.length) {
          setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
        }
      } else {
        // Deleting phase
        setDisplayedText(text.substring(0, index - 1));
        setIndex((prev) => prev - 1);
        if (index === 0) {
          setIsDeleting(false); // start typing again
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [index, isDeleting]);

  return <Text style={style}>{displayedText}|</Text>; // `|` simulates a cursor
}
