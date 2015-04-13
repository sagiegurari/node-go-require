package main

import (
	"github.com/gopherjs/gopherjs/js"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func New(x float64, y float64) *Vertex {
	return &Vertex{x, y}
}

func NewJS(x float64, y float64) *js.Object {
	return js.MakeWrapper(New(x, y))
}

func main() {
	js.Module.Get("exports").Set("vertex", map[string]interface{}{
		"New": NewJS,
	})
}
