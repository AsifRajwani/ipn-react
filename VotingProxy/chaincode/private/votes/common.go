package main

import
(
	"fmt"
	"runtime"
)

type OptionVote struct {
	Id string
	Value int
}

type ProxyVote struct {
	Id string
	Status string
	Description string
	Options []OptionVote
}


func FormatError(err string) string {
	_, fn, line, _ := runtime.Caller(1)
	return fmt.Sprintf(" %s:%d %v", fn, line, err)
}
