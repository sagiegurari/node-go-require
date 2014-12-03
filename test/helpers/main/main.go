package main

import (
	"github.com/gopherjs/gopherjs/js"
)

type Pet struct {
	name string
}

func (p *Pet) Name() string {
	return p.name
}

func (p *Pet) SetName(newName string) {
	p.name = newName
}

func New(name string) *Pet {
	return &Pet{name}
}

func main() {
	js.Module.Get("exports").Set("pet", map[string]interface{}{
		"New": New,
	})
}
